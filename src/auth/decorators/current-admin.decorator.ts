/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user || {};
    const sub = user.sub;
    const email = user.email;
    const role = user.role;

    let parsedSub: number;

    if (typeof sub === 'string') {
      parsedSub = parseInt(sub.trim(), 10);
    } else if (typeof sub === 'number') {
      parsedSub = sub;
    } else {
      throw new Error('❌ sub type invalide dans @CurrentAdmin');
    }

    if (!Number.isInteger(parsedSub)) {
      throw new Error('❌ sub non entier dans @CurrentAdmin');
    }

    if (parsedSub === undefined || isNaN(parsedSub)) {
      throw new Error('❌ ID vide ou invalide dans @CurrentAdmin');
    }

    console.log(
      '✅ ID prêt pour Int =',
      parsedSub,
      '| type =',
      typeof parsedSub,
    );

    return {
      id: parsedSub,
      email,
      role,
    };
  },
);
