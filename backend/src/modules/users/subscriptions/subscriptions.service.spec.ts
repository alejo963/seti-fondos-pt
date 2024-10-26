import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { subscriptionModelMockProvider } from '../../../../test/mocks/subscriptions.service';
import { TransactionsModule } from '../../transactions/transactions.module';
import { FundsModule } from '../../funds/funds.module';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let subscriptionModel: Model<Subscription>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsService, subscriptionModelMockProvider],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
    subscriptionModel = module.get<Model<Subscription>>(
      getModelToken(Subscription.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
