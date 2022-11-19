import {IsNotEmpty, IsString} from "class-validator";

export class GetLoginDto {
  @IsNotEmpty()
  @IsString()
    login: string;
}