import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

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

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;
}
