import {Body, Controller, HttpException, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {SignInDto} from "./dto/sign-in.dto";
import {ShortUserDto} from "@services/users/dto/short-user.dto";
import {plainToInstance} from "class-transformer";
import {SPACE_ROUTE} from "@/configs/env";

@Controller(SPACE_ROUTE)
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signIn')
  signIn(@Body() body: SignInDto): Promise<{ token: string, verify: number }> {
    const {login, password} = body;

    return this.authService.signIn(login.toLowerCase(), password);
  }

  @Post('registration')
  async registration(@Body() body: SignInDto): Promise<ShortUserDto> {
    const {login, password, additionalFields} = body;

    const newUser = await this.authService.registration(
        login.toLowerCase(),
        password,
        additionalFields
    );

    if (!newUser) {
      throw new HttpException(
        'Пользователь не зарегистрирован',
        400
      );
    }

    return plainToInstance(ShortUserDto, newUser);
  }
}