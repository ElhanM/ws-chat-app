import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpUserInput } from './dto/sign-up-user.input';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
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
    let createdUser: User;

    try {
      createdUser = await this.usersService.create({
        ...signUpUserInput,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('A user with this username already exists.');
      } else {
        throw error;
      }
    }

    try {
      return this.login(createdUser);
    } catch (error) {
      throw new Error('Login failed after sign up.');
    }
  }
}
