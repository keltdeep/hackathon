import {
  IsEmail,
  IsOptional,
  IsString
} from "class-validator";

export class UserAdditionalFieldDto {
  @IsString()
    lastName: string;

  @IsString()
    firstName: string;

  @IsString()
  @IsOptional()
    secondName: string;

  @IsString()
    codeWord: string;

  @IsEmail()
    email: string

  @IsString()
  @IsOptional()
    dateOfBirth: string | Date;
}