import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should find all users', async () => {
    await resolver.findAll();

    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('should find one user by username', async () => {
    const username = 'elhan';

    await resolver.findOne(username);

    expect(usersService.findOne).toHaveBeenCalledWith(username);
  });
});
