/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtSuperAdminStrategy extends PassportStrategy(
  Strategy,
  'jwt-superadmin',
) {
  constructor() {
    const jwtSecret = process.env.JWT_SUPERADMIN_SECRET;
    if (!jwtSecret) {
      throw new Error(
        '❌ JWT_SECRET non défini dans les variables d’environnement',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'SUPERADMIN') {
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
