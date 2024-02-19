import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  senderId?: string;

  @Field({ nullable: true })
  receiverId?: string;
}
