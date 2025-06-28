/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const userId = 4; // ou un autre ID que tu sais exister dans ta base
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true },
  });

  console.log('✅ Résultat trouvé :', user);
}

test().catch((err) => {
  console.error('❌ Erreur Prisma :', err);
});
