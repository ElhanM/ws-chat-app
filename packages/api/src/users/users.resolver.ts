import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContextWithAuth } from 'src/types';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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
  getAllOtherUsers(
    @Context() context: ContextWithAuth,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('take', { type: () => Int, nullable: true }) take: number,
    @Args('searchTerm', { type: () => String, nullable: true })
    searchTerm: string,
  ) {
    const user = context.req.user;

    return this.usersService.getAllOtherUsers(user, { skip, take }, searchTerm);
  }
}
