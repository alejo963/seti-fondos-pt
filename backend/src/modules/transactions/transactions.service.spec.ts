import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Model, Query } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { getModelToken } from '@nestjs/mongoose';
import {
  mockTransaction,
  transactionModelMockProvider,
} from '../../../test/mocks/transactions.service';
import { createMock } from '@golevelup/ts-jest';
import { HttpStatus } from '@nestjs/common';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get transactions', async () => {
    const mockedTransactions = [mockTransaction()];
    jest.spyOn(model, 'countDocuments').mockReturnValueOnce(
      createMock<Query<number, Transaction>>({
        exec: jest.fn().mockResolvedValueOnce(1),
      }),
    );
    jest.spyOn(model, 'find').mockReturnValueOnce(
      createMock<Query<Transaction[], Transaction[]>>({
        skip: () => ({
          limit: () => ({
            sort: () => ({
              populate: () => ({
                populate: () => ({
                  exec: jest.fn().mockResolvedValueOnce(mockedTransactions),
                }),
              }),
            }),
          }),
        }),
      }),
    );
    const transactions = await service.getTransactions({});
    expect(transactions).toEqual({
      statusCode: HttpStatus.OK,
      data: { count: 1, transactions: mockedTransactions },
    });
  });

  it('should create transaction', async () => {
    const date = new Date();
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(
        () => Promise.resolve(mockTransaction(date)) as any,
      );
    const fund = await service.createTransaction(mockTransaction(date));

    expect(fund).toEqual(mockTransaction(date));
  });
});
