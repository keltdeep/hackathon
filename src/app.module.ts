import { Module } from '@nestjs/common';
import {AnaliticModule} from "@services/analitic/analitic.module";

@Module({
  imports: [
    AnaliticModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
