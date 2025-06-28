/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService as ClientAuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth/client')
export class AuthController {
  constructor(private readonly authService: ClientAuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request) {
    console.log('🔐 TEST AUTH REQ.USER =', (req as any).user);
    return { ok: true };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    console.log('👤 GET PROFILE REQ.USER =', (req as any).user);
    return this.authService.findOne((req as any).user.id);
  }
}
