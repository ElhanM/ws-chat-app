import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(() => true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              username: 'elhan',
              password: 'hashedPassword',
            }), // Mock findOne to return a user
            create: jest.fn().mockResolvedValue({
              username: 'elhan',
              password:
                '$2b$10$1txZNBAeHDSk.QKNOjHCauqJN7bFMTAq0da2Q2OyRKYDfo3mMGcHy',
            }), // Mock create to return a user
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should validate a user', async () => {
    const username = 'elhan';
    const password = '1234';

    await service.validateUser(username, password);

    expect(usersService.findOne).toHaveBeenCalledWith(username);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword'); // Mocked user object's password
  });

  it('should login a user', async () => {
    const user = {
      username: 'elhan',
      id: '078d79f4-f4d9-4683-a564-f1d520ba37c1',
    };

    await service.login(user);

    expect(jwtService.sign).toHaveBeenCalledWith({
      username: user.username,
      sub: user.id,
    });
  });

  it('should sign up a user', async () => {
    const signUpUserInput = { username: 'elhan1', password: '1234' };

    await service.signUp(signUpUserInput);

    expect(usersService.create).toHaveBeenCalledWith(signUpUserInput);
    expect(jwtService.sign).toHaveBeenCalled(); // Update expectation to check if sign method is called
  });
});
