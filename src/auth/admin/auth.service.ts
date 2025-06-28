/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  static validateUser(arg0: any):
    | {
        id: number;
        email: string;
        name: string;
        role: string;
        password?: string;
      }
    | PromiseLike<{
        id: number;
        email: string;
        name: string;
        role: string;
        password?: string;
      }> {
    throw new Error('Method not implemented.');
  }
  private prisma = new PrismaClient();

  constructor(private readonly jwtService: JwtService) {}

  //async validateUser(email: string, password: string) {
  //const user = await this.prisma.user.findFirst({
  //where: { email },
  //select: {
  //id: true,
  //email: true,
  //name: true,
  //role: true,
  //password: true,
  //},
  //});

  //console.log('🔍 Utilisateur trouvé =', user);

  //if (
  //user &&
  //(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') &&
  //(await bcrypt.compare(password, user.password))
  //) {
  //const { password, ...result } = user;
  //return result;
  //}

  //throw new UnauthorizedException('Identifiants invalides');
  //}
  async validateUser(email: string, password: string) {
    console.log('📧 Email reçu =', email);
    const user = await this.prisma.user.findFirst({
      where: { email: email.trim().toLowerCase() },
    });
    console.log('📬 Utilisateur trouvé après trim =', user);

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable en BDD !');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔐 MDP valide ?', isPasswordValid);

    if (
      user &&
      isPasswordValid &&
      (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')
    ) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Mot de passe ou rôle invalide');
    }
  }

  async login(user: any) {
    console.log('📦 user reçu dans login =', user);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    console.log('🧪 payload envoyé dans JWT =', payload);
    const token = this.jwtService.sign(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirmPassword, ...rest } = createAdminDto;

    if (password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        role: Role.ADMIN,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return admin;
  }

  async findAll() {
    const admins = await this.prisma.user.findMany({
      where: { role: Role.ADMIN },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      data: admins,
      _count: admins.length,
    };
  }

  async findOne(id: string | number | bigint) {
    console.log('📦 id reçu dans findOne =', id, '| type =', typeof id);
    const intId = typeof id === 'number' ? id : parseInt(id.toString());

    if (typeof id === 'bigint') {
      const numericId = Number(id);
      return this.prisma.user.findUnique({
        where: { id: numericId },
        select: { id: true, email: true, name: true, role: true },
      });
    }

    if (typeof id === 'string' || typeof id === 'number') {
      const numericId = Number(id);

      if (isNaN(numericId)) {
        throw new Error('❌ ID invalide reçu dans findOne : ' + id);
      }

      return this.prisma.user.findUnique({
        where: { id: numericId },
        select: { id: true, email: true, name: true, role: true },
      });
    }

    throw new Error('❌ Type ID non supporté : ' + typeof id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { password, ...rest } = updateAdminDto;

    return this.prisma.user.update({
      data: {
        ...rest,
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
      where: {
        id,
        role: Role.ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
        role: Role.ADMIN,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
