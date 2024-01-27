import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Resolver((_of) => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation((_returns) => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query((_returns) => [Todo], { name: 'todos' })
  async findAll() {
    return this.todoService.findAll();
  }

  @Query((_returns) => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation((_returns) => Todo)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation((_returns) => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }
}
