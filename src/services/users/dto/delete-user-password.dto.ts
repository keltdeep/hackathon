import {IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteUserPasswordDto {
  @IsNotEmpty()
  @IsNumber()
    id: number;
}