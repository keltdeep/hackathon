import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import {operationType} from "@/configs/enums/transaction-type";

class CreateScoreDto {
    @IsNumber()
    userId: number;

    @IsString()
      currency: string;

    @IsNumber()
    @IsOptional()
      value: number;

    @IsBoolean()
      isActive: boolean;
}

class UpdateScore extends CreateScoreDto {
    @IsNumber()
    userId: number;

    @IsEnum(operationType)
    type: string
}

class CreateScoreByUser {
    @IsString()
    currency: string;
}

export {
    CreateScoreDto,
    UpdateScore,
    CreateScoreByUser
}