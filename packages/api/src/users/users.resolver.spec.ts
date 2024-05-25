import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { createMock } from '@golevelup/ts-jest';
import { ContextWithAuth } from 'src/types';
import { Request } from 'express';

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

  it('should get all other users', async () => {
    const mockUser = {
      id: '078d79f4-f4d9-4683-a564-f1d520ba37c1',
      username: 'elhan',
    };
    const mockAuthContext = createMock<ContextWithAuth>();
    const mockRequest = createMock<Request>();
    const context = {
      ...mockAuthContext,
      req: { ...mockRequest, user: mockUser },
    };
    const mockSkip = 0;
    const mockTake = 15;

    // Mock the getAllOtherUsers method in the UsersService
    usersService.getAllOtherUsers = jest.fn().mockResolvedValue([]);

    await resolver.getAllOtherUsers(context, mockSkip, mockTake, null);

    expect(usersService.getAllOtherUsers).toHaveBeenCalledWith(
      mockUser,
      {
        skip: mockSkip,
        take: mockTake,
      },
      null,
    );
  });
});
