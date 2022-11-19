import { Module } from '@nestjs/common';
import {CurrencyService} from "@services/api/currency/currency.service";

@Module({
    providers: [
        CurrencyService
    ],
    controllers: [],
    exports: [CurrencyService]
})
export class CurrencyModule {}