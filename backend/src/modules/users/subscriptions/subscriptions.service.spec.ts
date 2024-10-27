import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { DeleteResult, Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import {
  mockSubscription,
  subscriptionModelMockProvider,
} from '../../../../test/mocks/subscriptions.service';
import { TransactionsService } from '../../transactions/transactions.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FundsService } from '../../funds/funds.service';
import { mockUser } from '../../../../test/mocks/users.service';
import { UsersService } from '../users.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { mockFund } from '../../../../test/mocks/funds.service';
import { Transaction } from '../../transactions/schemas/transaction.schema';
import { stubMongoId } from '../../../../test/mocks/utility.mock';
import { SubscribeUserDto } from './dtos/subscription.dto';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let model: Model<Subscription>;
  let usersService: DeepMocked<UsersService>;
  let transactionsService: DeepMocked<TransactionsService>;
  let fundsService: DeepMocked<FundsService>;
  let notificationsService: DeepMocked<NotificationsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        subscriptionModelMockProvider,
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
        {
          provide: TransactionsService,
          useValue: createMock<TransactionsService>(),
        },
        {
          provide: FundsService,
          useValue: createMock<FundsService>(),
        },
        {
          provide: NotificationsService,
          useValue: createMock<NotificationsService>(),
        },
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
    model = module.get<Model<Subscription>>(getModelToken(Subscription.name));
    usersService = module.get<DeepMocked<UsersService>>(UsersService);
    transactionsService =
      module.get<DeepMocked<TransactionsService>>(TransactionsService);
    fundsService = module.get<DeepMocked<FundsService>>(FundsService);
    notificationsService =
      module.get<DeepMocked<NotificationsService>>(NotificationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create subscription and subscribe user', async () => {
    const mockedUser = mockUser();
    const mockedFund = mockFund();
    const mockedSubscription = mockSubscription();

    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<Transaction, Transaction>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }),
    );
    jest
      .spyOn(usersService, 'getUser')
      .mockResolvedValueOnce(mockedUser as any);

    jest
      .spyOn(fundsService, 'getFundById')
      .mockResolvedValueOnce(mockedFund as any);
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockedSubscription) as any);

    const subscribeUserDto = {
      fund: mockedFund._id,
      amount: mockedFund.minSubscriptionAmount,
    };
    const subscription = await service.subscribeToFund(
      mockedUser._id,
      subscribeUserDto,
    );

    expect(subscription).toEqual(mockedSubscription);
  });

  it('should throw when no enough amount', async () => {
    const payload: SubscribeUserDto = {
      fund: stubMongoId,
      amount: 10000000000,
    };

    jest
      .spyOn(usersService, 'getUser')
      .mockResolvedValueOnce(mockUser() as any);

    await expect(service.subscribeToFund(stubMongoId, payload)).rejects.toThrow(
      'There is not enough money on wallet',
    );
  });

  it('should throw when amount is less than min', async () => {
    const payload: SubscribeUserDto = {
      fund: stubMongoId,
      amount: 1000,
    };

    jest
      .spyOn(usersService, 'getUser')
      .mockResolvedValueOnce(mockUser() as any);

    jest
      .spyOn(fundsService, 'getFundById')
      .mockResolvedValueOnce(mockFund() as any);

    await expect(service.subscribeToFund(stubMongoId, payload)).rejects.toThrow(
      'Amount is less than min required amount',
    );
  });

  it('should throw when subscription already exists', async () => {
    const payload: SubscribeUserDto = {
      fund: stubMongoId,
      amount: 200000,
    };

    jest
      .spyOn(usersService, 'getUser')
      .mockResolvedValueOnce(mockUser() as any);

    jest
      .spyOn(fundsService, 'getFundById')
      .mockResolvedValueOnce(mockFund() as any);

    jest
      .spyOn(fundsService, 'getFundById')
      .mockResolvedValueOnce(mockFund() as any);

    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<Transaction, Transaction>>({
        exec: jest.fn().mockResolvedValueOnce(mockSubscription()),
      }),
    );

    await expect(service.subscribeToFund(stubMongoId, payload)).rejects.toThrow(
      'User is already subscribed to this fund',
    );
  });

  it('should get user subscriptions', async () => {
    const mockedUser = mockUser();
    const mockedSubscription = mockSubscription();

    jest.spyOn(model, 'find').mockReturnValueOnce(
      createMock<Query<Subscription[], Subscription[]>>({
        populate: () => ({
          exec: jest.fn().mockResolvedValueOnce([mockedSubscription]),
        }),
      }),
    );
    const subscriptions = await service.getUserSubscriptions(mockedUser._id);

    expect(subscriptions).toEqual([mockedSubscription]);
  });

  it('should unsubscribe user', async () => {
    const mockedSubscription = mockSubscription();
    const mockedUser = mockUser();

    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<Subscription, Subscription>>({
        exec: jest.fn().mockResolvedValueOnce(mockedSubscription),
      }),
    );

    jest.spyOn(model, 'deleteOne').mockReturnValueOnce(
      createMock<Query<DeleteResult, Subscription>>({
        exec: jest.fn().mockResolvedValueOnce({
          acknowledged: true,
          deletedCount: 1,
        }),
      }),
    );

    jest
      .spyOn(usersService, 'getUser')
      .mockResolvedValueOnce(mockedUser as any);
    jest
      .spyOn(usersService, 'updateUser')
      .mockResolvedValueOnce(mockedUser as any);
    jest
      .spyOn(transactionsService, 'createTransaction')
      .mockResolvedValueOnce(null);

    const response = await service.unsubscribeFromFund(
      mockedUser._id,
      mockedSubscription._id,
    );

    expect(response).toEqual({ acknowledged: true, deletedCount: 1 });
  });

  it('should throw when no suscription found', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<Subscription, Subscription>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }),
    );

    await expect(
      service.unsubscribeFromFund(stubMongoId, stubMongoId),
    ).rejects.toThrow('Subscription not found');
  });
});
