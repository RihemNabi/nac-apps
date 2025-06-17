/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import { generateUsersDataSeed } from './dataseed/users';
import { servicesDataSeed } from './dataseed/services';

const prisma = new PrismaClient();

async function main() {
  const usersDataSeed = await generateUsersDataSeed();

  await prisma.user.createMany({
    data: usersDataSeed,
  });

  await prisma.service.createMany({
    data: servicesDataSeed,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
