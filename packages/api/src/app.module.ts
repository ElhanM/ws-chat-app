import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { PrismaModule } from './prisma.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot(),
    // we use this prisma module to provide all other modules with the PrismaService
    // so we do not have to provide it manually in each module
    PrismaModule,
    AuthModule,
    TodoModule,
    UsersModule,
    ChatsModule,
  ],
})
export class AppModule {}
