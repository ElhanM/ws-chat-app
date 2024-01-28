import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpUserInput } from './dto/sign-up-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const accessToken = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });

    return {
      accessToken,
      user,
    };
  }

  async signUp(signUpUserInput: SignUpUserInput) {
    // TODO: Implement unique constraint on username in database and remove this check
    const user = await this.usersService.findOne(signUpUserInput.username);

    if (user) {
      throw new Error('User already exists');
    }

    return this.usersService.create({
      ...signUpUserInput,
    });
  }
}
