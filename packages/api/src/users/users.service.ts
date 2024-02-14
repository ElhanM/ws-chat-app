import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

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

  getAllOtherUsers(currentUser) {
    return this.prismaService.user.findMany({
      where: {
        NOT: {
          id: currentUser.id,
        },
      },
    });
  }

  deleteAllUsers() {
    return this.prismaService.user.deleteMany();
  }
}
