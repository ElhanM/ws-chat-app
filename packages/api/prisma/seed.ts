import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma.service';
import { UsersService } from '../src/users/users.service';
import { ChatsService } from '../src/chats/chats.service';
import users from './seed-data/users';
import chats from './seed-data/chats';

const prismaClient = new PrismaClient();
const prismaService = new PrismaService();
const usersService = new UsersService(prismaService);
const chatsService = new ChatsService(prismaService);

async function main() {
  await Promise.all(users.map((user) => usersService.create(user)));
  await Promise.all(chats.map((chat) => chatsService.create(chat)));
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
