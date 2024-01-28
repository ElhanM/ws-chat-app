import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma.service';
import { UsersService } from '../src/users/users.service';
import users from './seed-data/users';

const prismaClient = new PrismaClient();
const prismaService = new PrismaService();
const usersService = new UsersService(prismaService);

async function main() {
  await Promise.all(users.map((user) => usersService.create(user)));
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
