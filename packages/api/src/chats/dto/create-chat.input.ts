import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  receiverId: string;
}
