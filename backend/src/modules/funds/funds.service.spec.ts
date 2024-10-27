import { Test, TestingModule } from '@nestjs/testing';
import { FundsService } from './funds.service';
import { Fund } from './schemas/funds.schema';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import {
  fundModelMockProvider,
  mockFund,
} from '../../../test/mocks/funds.service';
import { createMock } from '@golevelup/ts-jest';

describe('FundsService', () => {
  let service: FundsService;
  let model: Model<Fund>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundsService, fundModelMockProvider],
    }).compile();

    service = module.get<FundsService>(FundsService);
    model = module.get<Model<Fund>>(getModelToken(Fund.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get funds', async () => {
    jest.spyOn(model, 'find').mockReturnValueOnce(
      createMock<Query<Fund[], Fund[]>>({
        exec: jest.fn().mockResolvedValueOnce([mockFund()]),
      }),
    );
    const funds = await service.getFunds();

    expect(funds).toEqual([mockFund()]);
  });

  it('should get fund by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<Fund, Fund>>({
        exec: jest.fn().mockResolvedValueOnce(mockFund()),
      }),
    );
    const fund = await service.getFundById(mockFund()._id);

    expect(fund).toEqual(mockFund());
  });

  it('should create fund', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockFund()) as any);
    const fund = await service.createFund(mockFund());

    expect(fund).toEqual(mockFund());
  });
});
