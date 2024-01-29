import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

// auth module is now a global module, so we do not have to import it in all other modules, only in app.module.ts
@Global()
@Module({
  // UsersService is being injected into auth.service.ts, so we need to import the UsersModule here
  // and also, inside of auth.service.ts, we need to export the UsersService
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule, // add this line
    JwtModule.registerAsync({
      imports: [ConfigModule], // and this line
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN') || '60s',
          },
          secret: configService.get('JWT_SECRET'),
        }) as JwtModuleOptions,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
