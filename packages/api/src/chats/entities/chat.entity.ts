import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  receiverId: string;

  @Field(() => Int)
  sender: string;

  @Field(() => Int)
  receiver: string;
}
