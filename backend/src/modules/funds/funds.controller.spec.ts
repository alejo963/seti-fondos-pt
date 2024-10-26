import { Test, TestingModule } from '@nestjs/testing';
import { FundsController } from './funds.controller';
import { FundsService } from './funds.service';
import { createMock } from '@golevelup/ts-jest';

describe('FundsController', () => {
  let controller: FundsController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
