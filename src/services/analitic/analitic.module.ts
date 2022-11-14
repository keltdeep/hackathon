import { Module } from '@nestjs/common';
import {AnaliticService} from "@services/analitic/analitic.service";
import {AnaliticController} from "@services/analitic/analitic.controller";

@Module({
  controllers: [AnaliticController],
  providers: [AnaliticService],
  exports: [AnaliticService]
})
export class AnaliticModule {}
