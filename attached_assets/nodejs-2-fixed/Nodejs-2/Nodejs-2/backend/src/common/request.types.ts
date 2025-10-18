import { Request } from 'express';

export interface AuthenticatedUser {
  userId: string;
  tenantId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
