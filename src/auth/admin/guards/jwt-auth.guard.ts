/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//export class JwtAuthGuard extends AuthGuard('jwt-admin') {}
export class JwtAuthGuard extends AuthGuard('jwt-admin') {
  handleRequest(err, user, info) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log('🛡️ JwtAuthGuard handleRequest →', { err, user, info });
    return user;
  }
}
