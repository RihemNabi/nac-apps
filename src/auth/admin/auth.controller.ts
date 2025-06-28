/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  //BadRequestException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { CurrentAdmin } from '../decorators/current-admin.decorator';
import { JwtSuperAdminGuard } from './guards/jwt-superadmin.guard';
//mport { JwtPayload } from './strategies/jwt.strategy';

@Controller('auth/admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentAdmin() admin) {
    console.log('✅ Admin connecté =', admin);
    return this.authService.findOne(admin.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string | number) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.authService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request) {
    console.log('🧪 test route, req.user =', req.user);
    return { ok: true };
  }
  @Get('public')
  testPublic() {
    return { ok: true };
  }

  @Get('test-auth')
  @UseGuards(JwtAuthGuard)
  testProtected(@Req() req) {
    return req.user;
  }
  @Get('ping')
  @UseGuards(JwtAuthGuard)
  ping() {
    console.log('🧭 ping reçu, req.user devrait être défini');
    return { pong: true, user: (Req as any).user };
  }
  @Get('test-strategy')
  @UseGuards(JwtAuthGuard)
  testStrategy(@Req() req: Request) {
    console.log('📥 testStrategy → req.user =', req.user);
    return { message: '✅ JWT OK', user: req.user };
  }
  @UseGuards(JwtSuperAdminGuard)
  @Get('superadmin-profile')
  getSuperAdminProfile(@Req() req) {
    console.log('👑 SuperAdmin connecté =', req.user);
    return {
      message: 'Bienvenue SuperAdmin 👑',
      user: req.user,
    };
  }
}
