import { Controller, Get, Post } from '@nestjs/common';
import { FundsService } from './funds.service';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get()
  getFunds() {
    return this.fundsService.getFunds();
  }

  @Post()
  createFunds() {
    return this.fundsService.createFunds();
  }
}
