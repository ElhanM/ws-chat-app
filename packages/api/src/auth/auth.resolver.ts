import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthExecutionContext } from 'src/types';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { SignUpUserInput } from './dto/sign-up-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    // loginUserInput cannot be removed, since it is used in GqlAuthGuard
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: AuthExecutionContext,
  ) {
    return this.authService.login(context.user);
  }

  // we automatically log in the user after sign up, so this also returns a LoginResponse
  @Mutation(() => LoginResponse)
  // i have global pipes enabled, so this is not needed
  // @UsePipes(new ValidationPipe())
  signUp(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUp(signUpUserInput);
  }
}
