import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateTransactionDto,
  FilterTransactionsDto,
  Order,
} from './dtos/transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getTransactions(params: FilterTransactionsDto) {
    const { limit, offset } = params || {
      limit: 10,
      offset: 0,
    };

    const order = params.order === Order.ASC ? 1 : -1;
    const count = await this.transactionModel.countDocuments().exec();

    const transactions = await this.transactionModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: order })
      .populate('user')
      .populate('fund')
      .exec();

    return { statusCode: HttpStatus.OK, data: { count, transactions } };
  }
  async createTransaction(payload: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = await this.transactionModel.create({
      ...payload,
      createdAt: new Date(),
    });
    return createdTransaction;
  }
}
