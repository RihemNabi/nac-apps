/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  async findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        role: 'CLIENT',
        id: { equals: id },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log('🧠 Utilisateur trouvé ?', user);
    if (
      user &&
      user.role === 'CLIENT' &&
      (await bcrypt.compare(pass, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
