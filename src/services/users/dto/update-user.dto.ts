import {Type} from "class-transformer";
import {IsArray, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import {UserAdditionalFieldDto} from "@services/users/dto/user-additional-field.dto";

export class UpdateUserDto {
    @IsString()
      login: string;

    @IsNumber()
      id: number;

    @IsNumber()
      verify: number;

    @IsString()
      role: string;

    @IsArray()
    @IsOptional()
      rights: string[];

    @IsString()
    @IsOptional()
      deletedAt: string | Date;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserAdditionalFieldDto)
      additionalFields: UserAdditionalFieldDto;
}