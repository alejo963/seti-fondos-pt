import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { mockTransaction } from '../../../test/mocks/transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: DeepMocked<TransactionsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: createMock<TransactionsService>(),
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<DeepMocked<TransactionsService>>(TransactionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get transactions', async () => {
    const mockedTransaction = mockTransaction(new Date());
    jest
      .spyOn(service, 'getTransactions')
      .mockResolvedValueOnce([mockedTransaction as any]);
    const transactions = await controller.getTransactions({});
    expect(transactions).toEqual([mockedTransaction as any]);
  });
});
