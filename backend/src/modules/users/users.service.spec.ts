import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model, Query, Types } from 'mongoose';
import { NotificationMethod, User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import {
  mockUser,
  userModelMockProvider,
} from '../../../test/mocks/users.service';
import { createMock } from '@golevelup/ts-jest';
import { CreateUserDto } from './dtos/user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userModelMockProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest.fn().mockResolvedValueOnce(mockUser()),
      }),
    );
    const user = await service.getUser(mockUser()._id);

    expect(user).toEqual(mockUser());
  });

  it('should create user', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }),
    );
    const userDto: CreateUserDto = {
      firstName: 'Oliver',
      lastName: 'Garcia',
      nationalId: '123456789',
      wallet: 50000,
      notificationMethod: NotificationMethod.EMAIL,
      email: 'test@me.com',
      phoneNumber: '1234567',
    };
    const mockedUser = mockUser(
      'Oliver',
      'Garcia',
      '123456789',
      50000,
      NotificationMethod.EMAIL,
      'test@me.com',
      '1234567',
    );
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockedUser) as any);
    const newUser = await service.createUser(userDto);

    expect(newUser).toEqual(mockedUser);
  });

  it('should not create user with existing nationalId', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest.fn().mockResolvedValueOnce(mockUser()),
      }),
    );
    const userDto: CreateUserDto = {
      firstName: 'Oliver',
      lastName: 'Garcia',
      nationalId: '123456789',
      wallet: 50000,
      notificationMethod: NotificationMethod.EMAIL,
      email: 'test@me.com',
      phoneNumber: '1234567',
    };
    await expect(service.createUser(userDto)).rejects.toThrow(
      'User with nationalId 123456789 already exists',
    );
  })

  it('should update user', async () => {
    const updatedUser = mockUser('Oliver');
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
      createMock<Query<User, User>>({
        exec: jest.fn().mockResolvedValueOnce(updatedUser),
      }),
    );

    const user = await service.updateUser(mockUser()._id, {
      firstName: 'Oliver',
    });
    expect(user).toEqual(updatedUser);
  });
});
