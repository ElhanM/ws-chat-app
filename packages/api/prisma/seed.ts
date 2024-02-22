import { PrismaClient } from '@prisma/client';
import { ChatsService } from '../src/chats/chats.service';
import { PrismaService } from '../src/prisma.service';
import { UsersService } from '../src/users/users.service';
import chats from './seed-data/chats';
import users from './seed-data/users';

const prismaClient = new PrismaClient();
const prismaService = new PrismaService();
const usersService = new UsersService(prismaService);
const chatsService = new ChatsService(prismaService);

async function main() {
  const newUsers = await Promise.all(
    users.map((user) => usersService.create(user)),
  );

  const elhanUser = newUsers.find((user) => user.username === 'elhan');

  if (elhanUser) {
    await Promise.all(
      newUsers
        .filter((user) => user.id !== elhanUser.id)
        .map((user) =>
          chatsService.create({
            content: `Hello, ${user.username}!`,
            senderId: elhanUser.id,
            receiverId: user.id,
          }),
        ),
    );
  }

  // so that test user is my latest chat
  await new Promise((resolve) => setTimeout(resolve, 200)).then(
    async () =>
      await Promise.all(chats.map((chat) => chatsService.create(chat))),
  );
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
