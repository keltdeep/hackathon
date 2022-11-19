import {HttpException, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./entity/user.entity";
import {AppDataSource} from "@/data-source";
import {logger} from "@/configs/logger";
import {UserAdditionalFieldsEntity} from "@services/users/entity/user-additional-fields.entity";
import {ScoreService} from "@services/score/score.service";

@Injectable()
export class UsersService {
  constructor(private scoreService: ScoreService) {
  }

  private readonly userRep: Repository<User> =
    AppDataSource.getRepository(User);

  private readonly userAdditionalRep: Repository<UserAdditionalFieldsEntity> =
    AppDataSource.getRepository(UserAdditionalFieldsEntity);

  saveUser(user: User): Promise<User> {
    try {
      return this.userRep.save(user);
    } catch (err) {
      logger.error(`saveUser: ${JSON.stringify(err)}`);
    }
  }

  async registrationUser(user: User): Promise<User> {
    const foundUser = await this.userRep.findOne({where: {login: user.login}});

    if (foundUser) {
      throw new HttpException('Пользователь существует', 400);
    }

    try {
      let newAdditionalFields;
      if (user.additionalFields) {
        if (user.additionalFields.dateOfBirth) {
          user.additionalFields.dateOfBirth = new Date(user.additionalFields.dateOfBirth);
        }

        newAdditionalFields = await this.userAdditionalRep.save(user.additionalFields)
      }

      user.additionalFields = newAdditionalFields

      const newUser = await this.userRep.save(user);

      await this.scoreService.createScore({
        userId: newUser.id,
        currency: "RUB",
        value: 0,
        isActive: true
      });

      return newUser
    } catch (err) {
      logger.error(`saveUser: ${JSON.stringify(err)}`);
    }
  }

  findUsers(): Promise<User[] | null> {
    try {
      return this.userRep.find({
        withDeleted: true,
        relations: ['additionalFields']
      });
    } catch (err) {
      logger.error(`findUsers: ${err}`);
    }
  }

  deleteUserPass(user: User): Promise<User> {
    try {
      return this.userRep.save(user);
    } catch (err) {
      logger.error(`deleteUserPassword: ${JSON.stringify(err)}`);
      throw new HttpException('Пароль пользователя не сброшен', 400);
    }
  }

  async findUserById(id: number): Promise<User | void> {
    const findedUser = await this.userRep.findOne(
      {
        where: {id},
        relations: ['additionalFields', 'userScore']
      });

    if (!findedUser || !findedUser.verify) {
      throw new HttpException('Пользователь не найден или не подтвержден', 404);
    }

    return findedUser;
  }

  async findUserByLogin(login: string): Promise<User | void> {
    const user = this.userRep.create({login});

    const findedUser = await this.userRep.findOne({
      where: {
        login: user.login
      }
    });

    if (!findedUser) {
      throw new HttpException('Пользователь не найден', 404);
    }

    return findedUser;
  }

  async deleteUserPasswordById(id: number): Promise<User> {
    const findedUser = await this.userRep.findOne({where: {id}});

    if (!findedUser) {
      throw new HttpException('Пользователь не найден', 400);
    }

    findedUser.password = null;

    return this.deleteUserPass(findedUser);
  }

  updateUserAdditionalFields(
    additionalFields: UserAdditionalFieldsEntity
  ): Promise<UserAdditionalFieldsEntity> {
    try {
      return this.userAdditionalRep.save(additionalFields);
    } catch (err) {
      logger.error(`updateUserAdditionalFields: ${JSON.stringify(err)}`);
      throw new HttpException('Не обновил доп. поля пользователя', 400);
    }
  }

  async updateUser(user: User): Promise<User> {
    let additionalFields: UserAdditionalFieldsEntity;
    const foundUser = await this.userRep.findOne({
      where: {
        id: user.id
      },
      withDeleted: true
    });

    if (!foundUser) {
      throw new HttpException('Пользователь не найден', 400);
    }

    if (user.additionalFields) {
      additionalFields = await this.updateUserAdditionalFields(user.additionalFields);
    }

    foundUser.verify = user.verify ? Number(user.verify) : foundUser.verify;
    foundUser.password = user.password ?? foundUser.password;
    foundUser.login = user.login ?? foundUser.login;
    foundUser.role = user.role ?? foundUser.role;
    foundUser.rights = user.rights ?? foundUser.rights;
    foundUser.deletedAt = user.deletedAt;
    foundUser.additionalFields = additionalFields ?? foundUser.additionalFields;

    try {
      return this.userRep.save(foundUser);
    } catch (err) {
      logger.error(`updateUser: ${JSON.stringify(err)}`);
      throw new HttpException('Пользователь не обновлен', 400);
    }
  }
}
