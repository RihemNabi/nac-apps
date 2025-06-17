/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Role } from '@prisma/client';
import { User } from '@prisma/client';
declare global {
  namespace Express {
    interface User {
      userId: number;
      email: string;
      role: Role;
    }

    interface Request {
      user: User;
    }
  }
}
