import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { getModelToken } from '@nestjs/mongoose';
import { transactionModelMockProvider } from '../../../test/mocks/transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let model: Model<Transaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, transactionModelMockProvider],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    model = module.get<Model<Transaction>>(getModelToken(Transaction.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
