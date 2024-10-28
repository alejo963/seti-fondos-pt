import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersService } from './users.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { mockUser } from '../../../test/mocks/users.service';
import { mockSubscription } from '../../../test/mocks/subscriptions.service';
import { stubMongoId } from '../../../test/mocks/utility.mock';

describe('UsersController', () => {
  let controller: UsersController;
  let service: DeepMocked<UsersService>;
  let subscriptionService: DeepMocked<SubscriptionsService>;

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
    service = module.get<DeepMocked<UsersService>>(UsersService);
    subscriptionService =
      module.get<DeepMocked<SubscriptionsService>>(SubscriptionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user by id', async () => {
    jest.spyOn(service, 'getUser').mockResolvedValueOnce(mockUser() as any);
    const user = await controller.getUser(mockUser()._id);
    expect(user).toEqual(mockUser());
  });

  it('should create user', async () => {
    jest.spyOn(service, 'createUser').mockResolvedValueOnce(mockUser() as any);
    const user = await controller.createUser(mockUser() as any);
    expect(user).toEqual(mockUser());
  });

  it('should update user', async () => {
    jest.spyOn(service, 'updateUser').mockResolvedValueOnce(mockUser() as any);
    const user = await controller.updateUser(mockUser()._id, mockUser() as any);
    expect(user).toEqual(mockUser());
  });

  it('should subscribe user', async () => {
    jest
      .spyOn(subscriptionService, 'subscribeToFund')
      .mockResolvedValueOnce(mockSubscription() as any);
    const subscription = await controller.subscribeToFund(stubMongoId, {
      fund: stubMongoId,
      amount: 200000,
    });
    expect(subscription).toEqual(mockSubscription());
  });

  it('should get user subscriptions', async () => {
    jest
      .spyOn(subscriptionService, 'getUserSubscriptions')
      .mockResolvedValueOnce([mockSubscription() as any]);
    const subscriptions = await controller.getUserSubscriptions(stubMongoId);
    expect(subscriptions).toEqual([mockSubscription()]);
  });

  it('should delete user subscription', async () => {
    jest
      .spyOn(subscriptionService, 'unsubscribeFromFund')
      .mockResolvedValueOnce({
        acknowledged: true,
        deletedCount: 1,
      });
    const subscription = await controller.unsubscribeFromFund(
      stubMongoId,
      stubMongoId,
    );
    expect(subscription).toEqual({
      acknowledged: true,
      deletedCount: 1,
    });
  });
});
