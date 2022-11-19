import {IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {IsNullable} from "@/utils/is-nullable.decorator";
import {UserAdditionalFieldDto} from "@services/users/dto/user-additional-field.dto";

export class SignInDto {
  @IsString({message: 'Логин должен быть не пустой строкой'})
    login: string;

  @IsString({message: 'Пароль должен быть не пустой строкой'})
    password: string;

  @IsNullable()
  @ValidateNested({ each: true })
  @Type(() => UserAdditionalFieldDto)
  additionalFields: UserAdditionalFieldDto;
}