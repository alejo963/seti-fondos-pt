import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { subscriptionModelMockProvider } from '../../../../test/mocks/subscriptions.service';
import { TransactionsService } from '../../transactions/transactions.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FundsService } from '../../funds/funds.service';
import { userModelMockProvider } from '../../../../test/mocks/users.service';
import { UsersService } from '../users.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let subscriptionModel: Model<Subscription>;
  let usersService: DeepMocked<UsersService>;
  let transactionsService: DeepMocked<TransactionsService>;
  let fundsService: DeepMocked<FundsService>;

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
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
    subscriptionModel = module.get<Model<Subscription>>(
      getModelToken(Subscription.name),
    );
    usersService = module.get<DeepMocked<UsersService>>(UsersService);
    transactionsService =
      module.get<DeepMocked<TransactionsService>>(TransactionsService);
    fundsService = module.get<DeepMocked<FundsService>>(FundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
