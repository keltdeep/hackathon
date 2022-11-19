import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

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