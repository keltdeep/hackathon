import { Module } from '@nestjs/common';
import {ScoreController} from "@services/score/score.controller";
import {ScoreService} from "@services/score/score.service";
import {CurrencyModule} from "@services/api/currency/currency.module";

@Module({
  imports: [CurrencyModule],
  providers: [ScoreService],
  controllers: [ScoreController],
  exports: [ScoreService]
})
export class ScoreModule {}
