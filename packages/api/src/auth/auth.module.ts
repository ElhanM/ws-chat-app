import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  // UsersService is being injected into auth.service.ts, so we need to import the UsersModule here
  // and also, inside of auth.service.ts, we need to export the UsersService
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '60s' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
