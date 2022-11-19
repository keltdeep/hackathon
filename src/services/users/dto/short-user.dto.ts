import {Exclude, Expose, Type} from "class-transformer";
import {IsArray, IsBoolean, IsNumber, IsString, ValidateNested} from 'class-validator';
import {IsNullable} from "../../../utils/is-nullable.decorator";
import {UserAdditionalFieldDto} from "@services/users/dto/user-additional-field.dto";
import {ScoreEntity} from "@services/score/entity/score.entity";

@Exclude()
export class ShortUserDto {
  @Expose()
  @IsString()
    login: string;

  @Expose()
  @IsNumber()
    id: number;

  @Expose()
  @IsNumber()
    verify: number;

  @Expose()
  @IsString()
    role: string;

  @Expose()
  @IsArray()
  @IsNullable()
    rights: string[];

  @Expose()
  @IsString()
    createdAt: string;

  @Expose()
  @IsString()
    dateOfBirth: string;

  @Expose()
  @IsString()
  @IsNullable()
    deletedAt: string;

  @Expose()
  @IsNullable()
  @ValidateNested({ each: true })
  @Type(() => UserAdditionalFieldDto)
    additionalFields: UserAdditionalFieldDto;

  @Expose()
  @IsNullable()
  @ValidateNested({ each: true })
  @Type(() => ScoreEntity)
    userScore: ScoreEntity;
}