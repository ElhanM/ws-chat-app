import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chats/entities/chat.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [Chat])
  sentChats: Chat[];

  @Field(() => [Chat])
  receivedChats: Chat[];
}
