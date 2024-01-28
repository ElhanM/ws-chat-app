import { InputType } from '@nestjs/graphql';
import { LoginUserInput } from './login-user.input';

@InputType()
export class SignUpUserInput extends LoginUserInput {}
