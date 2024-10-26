import { Injectable } from '@nestjs/common';
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

  async getTransactions(params: FilterTransactionsDto): Promise<Transaction[]> {
    const { limit, offset } = params || {
      limit: 10,
      offset: 0,
    };

    const order = params.order === Order.ASC ? 1 : -1;
    return this.transactionModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: order })
      .exec();
  }
  async createTransaction(payload: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel({
      ...payload,
      createdAt: new Date(),
    });
    return createdTransaction.save();
  }
}
