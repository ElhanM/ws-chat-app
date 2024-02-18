import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(
    () => '$2b$10$1txZNBAeHDSk.QKNOjHCauqJN7bFMTAq0da2Q2OyRKYDfo3mMGcHy',
  ),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // we need to mock all of the stuff injected into the service
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a user', async () => {
    const createUserInput = {
      username: 'elhan',
      password: '1234',
    };

    await service.create(createUserInput);

    expect(bcrypt.hash).toHaveBeenCalledWith(createUserInput.password, 10);
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        ...createUserInput,
        password:
          '$2b$10$1txZNBAeHDSk.QKNOjHCauqJN7bFMTAq0da2Q2OyRKYDfo3mMGcHy',
      },
    });
  });

  it('should find all users', async () => {
    await service.findAll();

    expect(prismaService.user.findMany).toHaveBeenCalled();
  });

  it('should find one user by username', async () => {
    const username = 'elhan';

    await service.findOne(username);

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: {
        username,
      },
    });
  });

  it('should get all other users', async () => {
    const mockUser = {
      id: '078d79f4-f4d9-4683-a564-f1d520ba37c1',
      username: 'elhan',
    };
    const mockPagination = {
      skip: 0,
      take: 15,
    };

    // Mock the findMany method in the PrismaService
    prismaService.user.findMany = jest.fn().mockResolvedValue([]);

    await service.getAllOtherUsers(mockUser, mockPagination);

    expect(prismaService.user.findMany).toHaveBeenCalledWith({
      ...mockPagination,
      where: {
        NOT: {
          id: mockUser.id,
        },
      },
    });
  });
});
