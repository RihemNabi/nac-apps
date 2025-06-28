/* eslint-disable prettier/prettier */
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const generateUsersDataSeed = async () => [
  {
    email: 'mehdi@nac.tn',
    name: 'mehdi',
    password: await bcrypt.hash('mehdi123', 10),
    role: Role.SUPER_ADMIN,
  },
  {
    email: 'admin@admin.com',
    name: 'admin',
    password: await bcrypt.hash('azerty123=', 10),
    role: Role.ADMIN,
  },
  {
    email: 'admin2@admin2.com',
    name: 'admin2',
    password: await bcrypt.hash('yosri2', 10),
    role: Role.ADMIN,
  },
  {
    email: 'client@client.com',
    name: 'client',
    password: await bcrypt.hash('client=', 10),
    role: Role.CLIENT,
    adminId: 2,
  },
  {
    email: 'client1@client1.com',
    name: 'client1',
    password: await bcrypt.hash('client1', 10),
    role: Role.CLIENT,
    adminId: 2,
  },
  {
    email: 'client2@client2.com',
    name: 'client2',
    password: await bcrypt.hash('GrlYCngpyQA=', 10),
    role: Role.CLIENT,
    adminId: 2,
  },
  {
    email: 'client3@client3.com',
    name: 'client3',
    password: await bcrypt.hash('hW8KvPpXdw4=', 10),
    role: Role.CLIENT,
    adminId: 3,
  },
];
