import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma.service';
import { UsersService } from '../src/users/users.service';

const prismaClient = new PrismaClient();
const prismaService = new PrismaService();
const usersService = new UsersService(prismaService);

const users = [
  {
    username: 'elhan',
    password: '1234',
  },
  {
    username: 'test',
    password: '1234',
  },
  {
    username: 'test2',
    password: '1234',
  },
  {
    username: 'test3',
    password: '1234',
  },
  {
    username: 'test4',
    password: '1234',
  },
  {
    username: 'test5',
    password: '1234',
  },
];

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
