import {Controller, Get} from '@nestjs/common';
import {AnaliticService} from "./analitic.service";

@Controller()
export class AnaliticController {
  constructor(private readonly analiticService: AnaliticService) {
  }

  @Get('/')
  helloWorld(): string {
    return this.analiticService.helloWorld()
  }
}