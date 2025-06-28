/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/require-await */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ADMIN_SECRET || 'admin-secret',
    });
    console.log('⚡ JwtStrategy instanciée !');
  }

  async validate(payload: JwtPayload) {
    console.log('🧠 PAYLOAD reçu dans JwtStrategy =', payload);
    console.log('🔥 JWT Strategy exécutée avec payload =', payload);
    const sub = Number(payload.sub);
    if (isNaN(sub)) {
      throw new UnauthorizedException('❌ sub invalide dans le token');
    }

    console.log('✅ sub validé =', sub, '| type =', typeof sub);

    return {
      sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
