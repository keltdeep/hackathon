import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {User} from "./entity/user.entity";
import {plainToInstance} from "class-transformer";
import {ShortUserDto} from "./dto/short-user.dto";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {DeleteUserPasswordDto} from "./dto/delete-user-password.dto";
import {GetLoginDto} from "./dto/get-login.dto";
import {userRoles} from "@/configs/enums/user-roles";
import {CustomRequest} from "@/models/custom-request";
import {UpdateUserDto} from "@services/users/dto/update-user.dto";
import {format} from 'date-fns';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('getLogin')
  getLogin(@Query() query: GetLoginDto): Promise<User | void> {
    return this.usersService.findUserByLogin(query.login.toLowerCase());
  }

  @Header('Content-Type', 'image/*')
  @Header('Content-Disposition', 'attachment;')
  @Get('uploads/:file')
  getUserAvatar(@Param() param: { file: string }, @Res() res): any {
    res.sendFile(param.file, { root: './uploads/'});
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Req() req: CustomRequest): Promise<ShortUserDto | void> {
    const user: User | void = await this.usersService.findUserById(req.user?.userId);

    return plainToInstance(ShortUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUsers')
  async getUsers(): Promise<ShortUserDto[] | void> {
    const users = await this.usersService.findUsers();

    return plainToInstance(ShortUserDto, users);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.admin)
  @Post('updateUser')
  async updateUser(
      @Body() body: UpdateUserDto,
      @Req() req: CustomRequest,
  ): Promise<ShortUserDto> {
    if (body.additionalFields?.dateOfBirth) {
      body.additionalFields.dateOfBirth = new Date(body.additionalFields.dateOfBirth);
    }

    if (body.deletedAt) {
      body.deletedAt = new Date();
    }

    body.id = req.user?.userId;

    const users: User = await this.usersService.updateUser(
      plainToInstance(User, body)
    );

    return plainToInstance(ShortUserDto, users);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.admin)
  @Post('deleteUserPassword')
  deleteUserPassword(
      @Body() body: DeleteUserPasswordDto,
      @Req() req: CustomRequest
  ): Promise<User> {
    return this.usersService.deleteUserPasswordById(req.user?.userId);
  }
}