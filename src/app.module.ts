import { Module } from '@nestjs/common';
import {AuthModule} from "@services/auth/auth.module";
import {UsersModule} from "@services/users/users.module";
import {ScoreModule} from "@services/score/score.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ScoreModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
