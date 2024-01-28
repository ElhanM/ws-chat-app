import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private readonly users = [
    {
      id: 1,
      username: 'elco',
      password: '$2b$10$yY8u9NJ1FrS07dvWKh9vzO04xA7b5yfXFxf.r1kY.9b1l44zX6kqS',
    },
    {
      id: 2,
      username: 'test',
      password: '$2b$10$yY8u9NJ1FrS07dvWKh9vzO04xA7b5yfXFxf.r1kY.9b1l44zX6kqS',
    },
  ];

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
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
