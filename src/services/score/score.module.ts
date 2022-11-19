import { Module } from '@nestjs/common';
import {ScoreController} from "@services/score/score.controller";
import {ScoreService} from "@services/score/score.service";

@Module({
  providers: [ScoreService],
  controllers: [ScoreController],
  exports: [ScoreService]
})
export class ScoreModule {}
