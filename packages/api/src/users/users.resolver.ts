import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { IncomingMessage } from 'http';
import { ContextWithAuth } from 'src/types';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username', { type: () => String }) username: string) {
    return this.usersService.findOne(username);
  }

  @Query(() => [User], { name: 'otherUsers' })
  @UseGuards(JwtAuthGuard)
  getAllOtherUsers(@Context() context: ContextWithAuth) {
    const user = context.req.user;

    return this.usersService.getAllOtherUsers(user);
  }
}
