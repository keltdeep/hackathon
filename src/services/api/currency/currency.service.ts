import {Injectable} from '@nestjs/common';
import {defaultAxios} from "@/configs/axios-factory";
import {logger} from "@/configs/logger";
import {CURRENCY_BASE_URL} from "@/configs/env";

@Injectable()
export class CurrencyService {
    private axios = defaultAxios(CURRENCY_BASE_URL)
    constructor(
    ){}

    async getAvailable(): Promise<{currency: string, banned: boolean}[]> {
        let res
        try {
            res = await this.axios.get('available')
        } catch (err) {
            logger.error('Не удалось получить')
        }

        return res?.data
    }

    async banCurrency(currency: string, banned: boolean): Promise<void> {
        try {
            await this.axios.post('change-ban', {
                currency,
                banned
            })
        } catch (err) {
            logger.error(`Не удалось забанить валюту ${JSON.stringify(err)}`)
        }
    }

    async getCurrencyRate(
        fromCurrency: string,
        toCurrency: string
    ): Promise<{
        base: string,
        second: string,
        rate: number
        date: string
    } | void> {
        let res

        try {
            res = await this.axios.get(
                `current-rate?base=${fromCurrency}&second=${toCurrency}`
            )
        } catch (err) {
            logger.error(`Не удалось получить отношение валют ${JSON.stringify(err)}`)
        }

        return res?.data
    }
}