import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginUserInput } from './dto/login-user.input';
import { SignUpUserInput } from './dto/sign-up-user.input';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    // loginUserInput cannot be removed, since it is used in GqlAuthGuard
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signUp(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUp(signUpUserInput);
  }
}
