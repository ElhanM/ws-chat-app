import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should login a user', async () => {
    const loginUserInput = { username: 'elhan', password: '1234' };
    const mockExecutionContext = createMock<ExecutionContext>();
    const context = {
      ...mockExecutionContext,
      user: { username: 'elhan', id: '078d79f4-f4d9-4683-a564-f1d520ba37c1' },
    };

    await resolver.login(loginUserInput, context);

    expect(authService.login).toHaveBeenCalledWith(context.user);
  });

  it('should sign up a user', async () => {
    const signUpUserInput = { username: 'elhan', password: '1234' };

    await resolver.signUp(signUpUserInput);

    expect(authService.signUp).toHaveBeenCalledWith(signUpUserInput);
  });
});
