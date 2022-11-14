import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import {APP_PORT} from "@/configs/env";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            credentials: true,
        },
    });

    AppDataSource.initialize()
      .then(async() => {
        await AppDataSource.runMigrations({transaction: 'each'});

        console.info('db ok hakaton');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

  await app.listen(APP_PORT);
}

bootstrap();
