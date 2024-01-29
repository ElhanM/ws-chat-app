import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class LoginUserInput {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  username: string;

  @Field()
  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.trim())
  password: string;
}
