import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FundsService } from './funds.service';
import { CreateFundDto } from './dtos/fund.dto';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get()
  getFunds() {
    return this.fundsService.getFunds();
  }

  @Get('id')
  getFundById(@Param('id') id: string) {
    return this.fundsService.getFundById(id);
  }

  @Post()
  createFund(@Body() payload: CreateFundDto) {
    return this.fundsService.createFund(payload);
  }
}
