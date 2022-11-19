import {HttpException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcrypt";
import {User} from "@services/users/entity/user.entity";
import {UserAdditionalFieldsEntity} from "@services/users/entity/user-additional-fields.entity";

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtTokenService: JwtService,
  ){}

  async registration(
      login: string,
      password: string,
      additionalFields?: any
  ): Promise<User> {
    const newUser = {password: '', login: '', additionalFields: {}};

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);
    newUser.login = login;
    newUser.additionalFields = additionalFields

    return this.usersService.registrationUser(newUser as User);
  }

  async signIn(
      login: string,
      password: string
  ): Promise<{token: string, verify: number}> {
    const findUser = await this.usersService.findUserByLogin(login);

    if (findUser) {
      if (!findUser.password) {
        const salt = await bcrypt.genSalt(10);

        findUser.password = await bcrypt.hash(password, salt);

        const savedUser = await this.usersService.saveUser(findUser);

        return this.loginWithCredentials(savedUser);
      } else {
        const validPassword = await bcrypt.compare(password, findUser.password);

        if (!validPassword) {
          throw new HttpException(
            'Проверь данные еще раз, или обратись к администратору для сброса',
            400
          );
        }

        return this.loginWithCredentials(findUser);
      }
    }
  }

  async validateUserCredentials(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByLogin(username);

    if (user && user.password === password) {
      const {password, ...result} = user;

      return result;
    }

    return null;
  }

  loginWithCredentials(user: any): {token: string, verify: number} {
    const payload = {
      login: user.login,
      sub: user.id,
      role: user.role,
      rights: user.rights
    };

    return {
      token: this.jwtTokenService.sign(payload),
      verify: user.verify
    };
  }
}