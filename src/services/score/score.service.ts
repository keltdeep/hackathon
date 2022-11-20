import {HttpException, Injectable} from '@nestjs/common';
import {In, Repository} from "typeorm";
import {AppDataSource} from "@/data-source";
import {ScoreEntity} from "@services/score/entity/score.entity";
import {logger} from "@/configs/logger";
import {CreateScoreDto, UpdateScore} from "@services/score/dto/create-score.dto";
import {CurrencyOperationDto} from "@services/score/dto/currency-operation.dto";
import {allCurrency} from "@services/score/consts";
import {User} from "@services/users/entity/user.entity";
import {CurrencyService} from "@services/api/currency/currency.service";
import {TransactionHistoryEntity} from "@services/score/entity/transaction-history.entity";
import {operationType, TransactionType} from "@/configs/enums/transaction-type";

@Injectable()
export class ScoreService {
  constructor(private currencyService: CurrencyService) {
  }

  private readonly scoreRep: Repository<ScoreEntity> =
    AppDataSource.getRepository(ScoreEntity);

  private readonly userRepository: Repository<User> =
      AppDataSource.getRepository(User);

  private readonly transactionHistoryRep: Repository<TransactionHistoryEntity> =
      AppDataSource.getRepository(TransactionHistoryEntity);

  createScore(score: CreateScoreDto): Promise<ScoreEntity> {
    const newScore = this.scoreRep.create(score);

    try {
      return this.scoreRep.save(newScore);
    } catch (err) {
      logger.error(`Счет не создан: ${JSON.stringify(err)}`);
    }
  }

  banCurrency(vars: {currency: string, banned: boolean}) {
    try {
      return this.currencyService.banCurrency(vars.currency, vars.banned)
    } catch (err) {
      logger.error(JSON.stringify(err))
    }
  }

  getHistoryByScoreUuid(vars) {
    try {
      return this.transactionHistoryRep.find({
        where: {
          scoreUuid: vars.uuid
        },
        order: {
          createdAt: 'DESC'
        }
      })
    } catch (err) {
      logger.error(JSON.stringify(err))
    }
  }

  async deleteScore(vars: {scoreUuid: string, userId: number}): Promise<unknown> {
    const foundScore =
        await this.scoreRep.findOneOrFail({
          where: {
            uuid: vars.scoreUuid
          }
        })

    if (foundScore.userId !== vars.userId || foundScore.value) {
      throw new HttpException('Нельзя удалить счет', 400)
    }

    return this.scoreRep.softDelete(vars.scoreUuid)
  }

  async createScoreByUser(
      score: {
        userId: number,
        currency: string
      }): Promise<ScoreEntity> {
    if (!allCurrency.find((el) => el === score.currency)) {
      throw new HttpException(
          'Такой валюты не существует',
          400
      )
    }

    const foundScore = await this.scoreRep.findOne({
      where: {
        userId: score.userId,
        currency: score.currency
      }})

    await this.userRepository.findOneOrFail(
        {
          where: {
            id: score.userId
          }
        }
      )

    if (foundScore) {
      throw new HttpException(
          'Такой счет уже есть',
          400
      )
    }

    const newScore = this.scoreRep.create(score)

    newScore.value = 0
    newScore.isActive = true

    return this.createScore(newScore)
  }

  findScoresByUserId(userId: number): Promise<ScoreEntity[] | void> {
    try {
      return this.scoreRep.find({
        where: {
          user: In([userId])
        }})
    } catch (err) {
      logger.error(`Счет не найден: ${JSON.stringify(err)}`);
    }
  }

  async currencyOperation(vars: CurrencyOperationDto) {
    const {
      toCurrency,
      fromCurrency,
      value
    } = vars
    if (
        !allCurrency.includes(toCurrency) ||
        !allCurrency.includes(fromCurrency)
    ) {
      throw new HttpException('Такой валюты нет', 400)
    }

    const foundScore =
        await this.scoreRep.find({
          where: {
            isActive: true,
            userId: vars.userId
          }
        })

    const foundedScores = foundScore.map((el) => {
        if ([vars.toCurrency, vars.fromCurrency].includes(el.currency)) {
          return el
        }
    }).filter(Boolean)

    const fromCurrencyScore = foundedScores.find((el) =>
        el.currency === fromCurrency
    )

    const toCurrencyScore = foundedScores.find((el) =>
        el.currency === toCurrency
    )

    if (fromCurrencyScore && fromCurrencyScore.value < value) {
      throw new HttpException('Недостаточно денег', 400)
    }


    if (foundedScores.length <= 1) {
      throw new HttpException('Нет счета для покупки', 400)
    }
    const allAvailableCurrency = await this.currencyService.getAvailable()

    let operationAvailable = true
    const allUserCurrency = [toCurrency, fromCurrency]

    allUserCurrency.forEach((cur) => {
      const foundCur = allAvailableCurrency.find((el) => el.currency === cur)

      if (foundCur?.banned) {
        operationAvailable = false
      }
    })

    if (!operationAvailable) {
      throw new HttpException('Операция с данными валютами не возможна', 400)
    }


    const rateInfo = await this.currencyService.getCurrencyRate(fromCurrency, toCurrency)

    if (rateInfo) {
      const resultToScoreForAdd = Number((rateInfo.rate * value).toFixed(4))

      fromCurrencyScore.value = Number((fromCurrencyScore.value - value).toFixed(4))
      toCurrencyScore.value = toCurrencyScore.value + resultToScoreForAdd

      try {
        return AppDataSource.manager.transaction(async (transactionalEntityManager) => {
          const fromHistory = this.transactionHistoryRep.create({
            fromCurrency,
            toCurrency,
            type: TransactionType.buy,
            value: value,
            scoreUuid: fromCurrencyScore.uuid,
            additionalScoreUuid: toCurrencyScore.uuid
          })

          const toHistory = this.transactionHistoryRep.create({
            fromCurrency,
            toCurrency,
            type: TransactionType.replenishment,
            value: resultToScoreForAdd,
            scoreUuid: toCurrencyScore.uuid,
            additionalScoreUuid: fromCurrencyScore.uuid
          })

          const scoreRes = await transactionalEntityManager.save(
              await this.scoreRep.save([toCurrencyScore, fromCurrencyScore]),
          );

          const historyRes = await transactionalEntityManager.save(
              await this.transactionHistoryRep.save([fromHistory, toHistory])
          );

          return {
            scoreRes,
            historyRes
          }
        });
      } catch (err) {
        logger.error(`Не пройдена транзакция по покупке: ${JSON.stringify(err)}`);
      }
    }


  }

  async updateScore(score: UpdateScore): Promise<ScoreEntity> {
    const allScores = await this.findScoresByUserId(score.userId)

    if (!allScores || !allScores?.length) {
      throw new HttpException('Счета не найдены', 400)
    }

    let foundScore = allScores.find(({currency}) => currency === score.currency)

    const newHistory = this.transactionHistoryRep.create({
      fromCurrency: score.type === operationType.up ? null : foundScore.currency,
      toCurrency: score.type === operationType.down ? null : foundScore.currency,
      type: score.type === operationType.up ? TransactionType.replenishment : TransactionType.buy,
      value: score.type === operationType.up ? (score.value - foundScore.value) : (foundScore.value - score.value),
      scoreUuid: foundScore.uuid,
      additionalScoreUuid: null
    })

    foundScore.isActive = score.isActive
    foundScore.value = score.value

    try {
      await this.transactionHistoryRep.save(newHistory)
      return this.scoreRep.save(foundScore);
    } catch (err) {
      logger.error(`Счет не создан: ${JSON.stringify(err)}`);
    }
  }

}
