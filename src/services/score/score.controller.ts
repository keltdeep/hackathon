import {
  Body,
  Controller, Delete,
  Post, Req, UseGuards
} from "@nestjs/common";
import {ScoreService} from "@services/score/score.service";
import {ScoreEntity} from "@services/score/entity/score.entity";
import {
  CreateScoreByUser,
  CreateScoreDto,
  UpdateScore
} from "@services/score/dto/create-score.dto";
import {JwtAuthGuard} from "@services/auth/guards/jwt-auth.guard";
import {CurrencyOperationDto} from "@services/score/dto/currency-operation.dto";
import {CustomRequest} from "@/models/custom-request";
import {DeleteScoreDto} from "@services/score/dto/delete-score.dto";
import {SPACE_ROUTE} from "@/configs/env";

@Controller(SPACE_ROUTE)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {
  }
  @UseGuards(JwtAuthGuard)
  @Post('createScore')
  createScore(@Body() body: CreateScoreDto): Promise<ScoreEntity | void> {
    return this.scoreService.createScore(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createScoreByUser')
  createScoreByUser(
      @Body() body: CreateScoreByUser,
      @Req() req: CustomRequest
  ): Promise<ScoreEntity | void> {
    return this.scoreService.createScoreByUser({
      currency: body.currency,
      userId: req.user?.userId
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateScore')
  updateScore(
      @Body() body: UpdateScore,
      @Req() req: CustomRequest
  ): Promise<ScoreEntity | void> {
    body.userId = req.user?.userId

    return this.scoreService.updateScore(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteScore')
  deleteScore(
      @Body() body: DeleteScoreDto,
      @Req() req: CustomRequest
  ): Promise<unknown> {
    body.userId = req.user?.userId

    return this.scoreService.deleteScore(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post("currencyOperation")
  currencyOperation(@Body() body: CurrencyOperationDto): Promise<ScoreEntity | void> {
    return this.scoreService.currencyOperation(body);
  }
}