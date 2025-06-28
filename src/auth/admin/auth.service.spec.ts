/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
type UserWithPassword = {
  id: number;
  email: string;
  name: string;
  role: string;
  password: string;
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'PrismaService',
          useValue: {
            user: {
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('✅ retourne l’utilisateur si valide', async () => {
    const userMock = {
      id: 20,
      role: 'ADMIN',
      name: 'Fake Admin',
      email: 'admin@mail.com',
      password: 'hashé',
    };
    (authService as any).prisma = {
      user: {
        findFirst: jest.fn().mockResolvedValue(userMock),
      },
    };

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

    const result = (await authService.validateUser(
      'admin@mail.com',
      'admin123',
    )) as Partial<UserWithPassword>;

    expect(result).toBeDefined();
    expect(result.email).toBe('admin@mail.com');
    expect(result?.password).toBeUndefined(); // password supprimé volontairement dans la méthode
  });

  it('❌ retourne null si mot de passe faux', async () => {
    const userMock: UserWithPassword = {
      id: 1,
      email: 'admin@mail.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
      name: '',
    };

    (authService as any).prisma = {
      user: {
        findFirst: jest.fn().mockResolvedValue(userMock),
      },
    };

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(false);

    const result = await authService.validateUser(
      'admin@mail.com',
      'wrongpass',
    );
    expect(result).toBeNull();
  });

  it('❌ retourne null si rôle non autorisé', async () => {
    const userMock: UserWithPassword = {
      id: 1,
      email: 'client@mail.com',
      password: await bcrypt.hash('client123', 10),
      role: 'CLIENT',
      name: '',
    };

    (authService as any).prisma = {
      user: {
        findFirst: jest.fn().mockResolvedValue(userMock),
      },
    };

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

    const result = (await authService.validateUser(
      'client@mail.com',
      'client123',
    )) as Partial<UserWithPassword>;
    expect(result).toBeNull();
  });
});
