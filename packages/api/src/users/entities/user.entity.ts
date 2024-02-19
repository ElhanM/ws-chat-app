import { Field, ObjectType } from '@nestjs/graphql';

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
}
