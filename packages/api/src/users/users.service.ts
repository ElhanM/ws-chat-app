import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@ws-chat-app/src';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    const user = {
      ...createUserInput,
      password: hashedPassword,
    };

    return this.prismaService.user.create({
      data: user,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getAllOtherUsers(
    currentUser: User,
    pagination: Prisma.UserFindManyArgs,
    searchTerm: string,
  ) {
    let whereClause: Prisma.UserWhereInput = {
      NOT: {
        id: currentUser.id,
      },
    };

    if (searchTerm) {
      whereClause = {
        ...whereClause,
        AND: [{ username: { contains: searchTerm, mode: 'insensitive' } }],
      };
    }

    const results = await this.prismaService.user.findMany({
      ...pagination,
      where: whereClause,
    });

    return results;
  }
}
