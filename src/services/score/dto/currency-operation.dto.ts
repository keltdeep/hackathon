import {IsNumber, IsString} from "class-validator";

export class CurrencyOperationDto {
    @IsNumber()
    userId: number;

    @IsString()
    fromCurrency: string

    @IsString()
    toCurrency: string

    @IsNumber()
    value: number
}