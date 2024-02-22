import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContextWithAuth } from 'src/types';
import { ChatsService } from './chats.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @Mutation(() => Chat)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatsService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id') id: string) {
    return this.chatsService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
    return this.chatsService.update(updateChatInput.id, updateChatInput);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id') id: string) {
    return this.chatsService.remove(id);
  }

  @Query(() => [Chat], { name: 'chatsBetweenUsers' })
  chatsBetweenUsers(
    @Args('senderId') senderId: string,
    @Args('receiverId') receiverId: string,
  ) {
    return this.chatsService.chatsBetweenUsers(senderId, receiverId);
  }

  @Query(() => [Chat], { name: 'chatsWithLatestMessage' })
  @UseGuards(JwtAuthGuard)
  chatsWithLatestMessage(
    @Context() context: ContextWithAuth,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('take', { type: () => Int, nullable: true }) take: number,
  ) {
    const { id: userId } = context.req.user;

    return this.chatsService.getChatsWithLatestMessage(userId, { skip, take });
  }
}
