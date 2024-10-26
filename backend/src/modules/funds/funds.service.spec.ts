import { Test, TestingModule } from '@nestjs/testing';
import { FundsService } from './funds.service';
import { Fund } from './schemas/funds.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { fundModelMockProvider } from '../../../test/mocks/funds.service';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
