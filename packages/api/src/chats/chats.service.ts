import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Prisma } from '@prisma/client';
import { LatestChat } from '@ws-chat-app/src';

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createChatInput: CreateChatInput) {
    return this.prismaService.chat.create({ data: createChatInput });
  }

  async findAll() {
    return this.prismaService.chat.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.chat.findUnique({ where: { id } });
  }

  async update(id: string, updateChatInput: UpdateChatInput) {
    return this.prismaService.chat.update({
      where: { id },
      data: updateChatInput,
    });
  }

  async remove(id: string) {
    return this.prismaService.chat.delete({ where: { id } });
  }

  async chatsBetweenUsers(senderId: string, receiverId: string) {
    return this.prismaService.chat.findMany({
      where: {
        OR: [
          {
            AND: [{ senderId }, { receiverId }],
          },
          {
            AND: [{ senderId: receiverId }, { receiverId: senderId }],
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getChatsWithLatestMessage(
    userId: string,
    { skip, take }: { skip?: number; take?: number },
  ) {
    // First, get all unique chat pairs involving the user
    // Also, we need to make sure that we do not allow multiple chats between the same pair of users
    // Prisma does not support this kind of query, so we have to use a raw query
    const chatPairs: { senderId: string; receiverId: string }[] = await this
      .prismaService.$queryRaw`
    SELECT "senderId", "receiverId"
    FROM (
      SELECT "senderId", "receiverId", "createdAt",
             ROW_NUMBER() OVER(PARTITION BY LEAST("senderId", "receiverId"), GREATEST("senderId", "receiverId") ORDER BY "createdAt" DESC) as rn
      FROM "chats"
      WHERE ("senderId" = ${userId} OR "receiverId" = ${userId}) AND "senderId" != "receiverId"
    ) AS ordered_chats
    WHERE rn = 1
    ORDER BY "createdAt" DESC
    LIMIT ${take} OFFSET ${skip}
  `;

    console.log({ chatPairs });

    // Then, for each unique pair, get the latest chat
    const chats: LatestChat[] = await Promise.all(
      chatPairs.map((pair) =>
        this.prismaService.chat.findFirst({
          where: {
            AND: [{ senderId: pair.senderId }, { receiverId: pair.receiverId }],
          },
          include: {
            sender: true,
            receiver: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ),
    );

    console.log({ chats });

    return chats.sort(
      (a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime() ||
        a.id.localeCompare(b.id),
    );
  }
}
