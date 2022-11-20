import {HttpException, ValidationPipe} from "@nestjs/common";
import {ValidationError} from "class-validator";

/**
 * Находим самую первую ошибку, также просматриваем все вложенные объекты,
 * если в ДТО была вложенность
 */
const getFirstErrorWithMessage = (items: ValidationError[]): object => {
  if (items[0]?.constraints) {
    return items[0].constraints;
  } else if (items[0].children[0]?.constraints) {
    return items[0].children[0]?.constraints;
  } else if (items[0].children[0]?.children?.length) {
    return getFirstErrorWithMessage(items[0].children);
  }

  return;
};

/**
 * Тут валидация и выброс корректных ошибок на фронт
 * На фронт выкидывается только первая из найденных ошибок в ДТО
 */
export const validationPipe = new ValidationPipe({
  stopAtFirstError: true,
  dismissDefaultMessages: true,
  exceptionFactory: (errors: ValidationError[]): void => {
    const firstErrorMessage = getFirstErrorWithMessage(errors);

    for (const key in firstErrorMessage) {
      if (firstErrorMessage[key]) {
        throw new HttpException(firstErrorMessage[key], 400);
      }
    }


    throw new HttpException('Неизвестная ошибка', 500);
  }
});