import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpDto } from './dto/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<AuthService>;
  const accessToken = 'xxxxxxxxxxxxx';

  beforeEach(async () => {
    fakeAuthService = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      signUp: (_signupDto: SignUpDto) => Promise.resolve(),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      signIn: (_authCredentialsDto: AuthCredentialsDto) =>
        Promise.resolve({ accessToken }),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should signup without errors', async () => {
    const dto = {
      email: 'test@test.es',
      password: 'Admin1234',
      name: 'Pablo',
      surname: 'Cianes',
    };

    await controller.signUp(dto);
  });

  test('should return token', async () => {
    const dto = { email: 'test@test.es', password: 'Admin1234' };

    const response = await controller.signIn(dto);

    expect(response.accessToken).toBe(accessToken);
  });
});
