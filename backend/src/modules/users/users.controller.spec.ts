import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from './users.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
        {
          provide: SubscriptionsService,
          useValue: createMock<SubscriptionsService>(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
