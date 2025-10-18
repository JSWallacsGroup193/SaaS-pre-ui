import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(email: string, password: string, tenantId?: string) {
    const hashed = await bcrypt.hash(password, 10);
    
    // If no tenantId provided, create a default tenant
    let finalTenantId = tenantId;
    if (!finalTenantId) {
      const tenant = await prisma.tenant.create({
        data: { name: 'Default Organization' },
      });
      finalTenantId = tenant.id;
    }
    
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashed, 
        tenant: { connect: { id: finalTenantId } }
      },
    });
    return this.sign(user.id, finalTenantId);
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.sign(user.id, user.tenantId);
  }

  private sign(userId: string, tenantId: string) {
    const payload = { sub: userId, tenantId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
