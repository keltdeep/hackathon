import {HttpException, Injectable} from '@nestjs/common';
import {In, Repository} from "typeorm";
import {AppDataSource} from "@/data-source";
import {ScoreEntity} from "@services/score/entity/score.entity";
import {logger} from "@/configs/logger";
import {
  CreateScoreDto,
  UpdateScore
} from "@services/score/dto/create-score.dto";
import {CurrencyOperationDto} from "@services/score/dto/currency-operation.dto";
import {allCurrency} from "@services/score/consts";
import {User} from "@services/users/entity/user.entity";

@Injectable()
export class ScoreService {
  private readonly scoreRep: Repository<ScoreEntity> =
    AppDataSource.getRepository(ScoreEntity);

  private readonly userRepository: Repository<User> =
      AppDataSource.getRepository(User);

  createScore(score: CreateScoreDto): Promise<ScoreEntity> {
    const newScore = this.scoreRep.create(score);

    try {
      return this.scoreRep.save(newScore);
    } catch (err) {
      logger.error(`Счет не создан: ${JSON.stringify(err)}`);
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
    if (
        !allCurrency.includes(vars.toCurrency) ||
        !allCurrency.includes(vars.fromCurrency)
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

    const checkScores = foundScore.map((el) => {
        if ([vars.toCurrency, vars.fromCurrency].includes(el.currency)) {
          return el
        }
    }).filter(Boolean)

    if (foundScore.length <= 1 && checkScores.length === 2) {
      throw new HttpException('Нет счета для покупки', 400)
    }

    /**
     * TODO
     */

    console.log(foundScore, 'foundScore')
  }

  async updateScore(score: UpdateScore): Promise<ScoreEntity> {
    const allScores = await this.findScoresByUserId(score.userId)

    if (!allScores || !allScores?.length) {
      throw new HttpException('Счета не найдены', 400)
    }

    let foundScore = allScores.find(({currency}) => currency === score.currency)

    foundScore.isActive = score.isActive
    foundScore.value = score.value

    try {
      return this.scoreRep.save(foundScore);
    } catch (err) {
      logger.error(`Счет не создан: ${JSON.stringify(err)}`);
    }
  }

}
