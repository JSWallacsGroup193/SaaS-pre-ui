import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../common/request.types';

@Injectable()
export class JwtAttachMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}
  use(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (auth?.startsWith('Bearer ')) {
      const token = auth.slice('Bearer '.length);
      try {
        const payload = this.jwt.verify(token);
        req.user = { userId: payload.sub, tenantId: payload.tenantId };
      } catch {}
    }
    next();
  }
}
