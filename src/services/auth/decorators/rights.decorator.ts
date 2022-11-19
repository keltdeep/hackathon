import {CustomDecorator, SetMetadata} from '@nestjs/common';

export const Rights = (...rights: string[]): CustomDecorator<string> =>
  SetMetadata('rights', rights);