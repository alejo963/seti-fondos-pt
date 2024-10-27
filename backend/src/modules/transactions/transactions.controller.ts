import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { FilterTransactionsDto } from './dtos/transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Get()
  getTransactions(@Query() params: FilterTransactionsDto) {
    return this.transactionsService.getTransactions(params);
  }
}
