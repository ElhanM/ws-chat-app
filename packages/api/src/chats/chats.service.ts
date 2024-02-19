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
}
