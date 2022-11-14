import { NODE_ENV } from './env';
import * as winston from 'winston';

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
  ),
);

export const logger = winston.createLogger({
  transports: [
    NODE_ENV === 'dev'
      ? new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          alignColorsAndTime,
        ),
      })
      : new winston.transports.File({
        filename: `logs/error.log`,
        level: 'error',
      }),
  ],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    winston.format.label({
      label: '[LOGGER]',
    }),
    winston.format.json(),
  ),
});
