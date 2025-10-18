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
  

  async refresh(refreshToken: string) {
    // Hash incoming token and match
    const hash = require('crypto').createHash('sha256').update(refreshToken).digest('hex');
    const token = await this.prisma.refreshToken.findFirst({ where: { tokenHash: hash, revokedAt: null, expiresAt: { gt: new Date() } } });
    if (!token) throw new Error('Invalid refresh token');
    const user = await this.prisma.user.findUnique({ where: { id: token.userId } });
    if (!user) throw new Error('User not found');

    // rotate: revoke old, issue new
    await this.prisma.refreshToken.update({ where: { id: token.id }, data: { revokedAt: new Date() } });
    const newRefresh = require('crypto').randomBytes(32).toString('base64url');
    const newHash = require('crypto').createHash('sha256').update(newRefresh).digest('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tenantId: user.tenantId,
        tokenHash: newHash,
        expiresAt: new Date(Date.now() + 1000*60*60*24*30),
      }
    });

    const payload = { sub: user.id, tenantId: user.tenantId };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, refresh_token: newRefresh };
  }

  async revoke(refreshToken: string) {
    const hash = require('crypto').createHash('sha256').update(refreshToken).digest('hex');
    const token = await this.prisma.refreshToken.findFirst({ where: { tokenHash: hash, revokedAt: null } });
    if (token) {
      await this.prisma.refreshToken.update({ where: { id: token.id }, data: { revokedAt: new Date() } });
    }
    return { revoked: true };
  }
}
