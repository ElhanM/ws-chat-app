import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

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

  async getChatsWithLatestMessage(userId: string) {
    // First, get all unique chat pairs involving the user
    const chatPairs = await this.prismaService.chat.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      select: {
        senderId: true,
        receiverId: true,
      },
      distinct: ['senderId', 'receiverId'],
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Then, for each unique pair, get the latest chat
    const chats = await Promise.all(
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

    return chats;
  }
}
