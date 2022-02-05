import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const url: string = req.originalUrl;
    const res = url.split('/');
    if (res[1] === 'file') return true;
    try {
      const bearer = req.headers.authorization[0];
      const token = req.headers.authorization[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }
      const secretKey = 'secret-key';
      jwt.verify(token, secretKey);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
