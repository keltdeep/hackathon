import {IsNumber, IsString} from 'class-validator';

class DeleteScoreDto {
    @IsNumber()
    userId: number;

    @IsString()
    scoreUuid: string;
}

export {
    DeleteScoreDto
}