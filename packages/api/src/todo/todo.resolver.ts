import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation((returns) => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query((returns) => [Todo], { name: 'todos' })
  async findAll() {
    return this.todoService.findAll();
  }

  @Query((returns) => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation((returns) => Todo)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation((returns) => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }
}
