import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

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
  chatsWithLatestMessage(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.chatsService.getChatsWithLatestMessage(userId);
  }
}
