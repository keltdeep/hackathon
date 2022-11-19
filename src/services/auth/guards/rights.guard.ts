import {Injectable, CanActivate, ExecutionContext, HttpException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rights = this.reflector.get<string[]>('rights', context.getHandler());

    if (!rights) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const accept = user.rights.find((right) => rights.includes(right));

    if (!accept) {
      throw new HttpException('Доступ запрещен!', 400);
    }

    return true;
  }
}
