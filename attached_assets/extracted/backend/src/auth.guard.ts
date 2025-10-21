import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    // Mock user injection
    req.user = { id: 'user-123', tenantId: 'tenant-abc' };
    return true;
  }
}