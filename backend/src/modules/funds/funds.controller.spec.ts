import { Test, TestingModule } from '@nestjs/testing';
import { FundsController } from './funds.controller';
import { FundsService } from './funds.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { mockFund } from '../../../test/mocks/funds.service';
import { stubMongoId } from '../../../test/mocks/utility.mock';

describe('FundsController', () => {
  let controller: FundsController;
  let service: DeepMocked<FundsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundsController],
      providers: [
        {
          provide: FundsService,
          useValue: createMock<FundsService>(),
        },
      ],
    }).compile();

    controller = module.get<FundsController>(FundsController);
    service = module.get<DeepMocked<FundsService>>(FundsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get funds', async () => {
    jest.spyOn(service, 'getFunds').mockResolvedValueOnce([mockFund() as any]);
    const funds = await controller.getFunds();
    expect(funds).toEqual([mockFund()]);
  });

  it('should get fund by id', async () => {
    jest.spyOn(service, 'getFundById').mockResolvedValueOnce(mockFund() as any);
    const fund = await controller.getFundById(stubMongoId);
    expect(fund).toEqual(mockFund());
  });

  it('should create fund', async () => {
    jest.spyOn(service, 'createFund').mockResolvedValueOnce(mockFund() as any);
    const fund = await controller.createFund(mockFund());
    expect(fund).toEqual(mockFund());
  });
});
