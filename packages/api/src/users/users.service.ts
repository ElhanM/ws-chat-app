import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
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

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length + 1,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
