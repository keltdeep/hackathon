import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UsersController} from "./users.controller";
import {ScoreModule} from "@services/score/score.module";

@Module({
  imports: [ScoreModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
