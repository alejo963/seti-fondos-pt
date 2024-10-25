import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}
  async createTransaction(payload: CreateTransactionDto) {
    const createdTransaction = new this.transactionModel({
      ...payload,
      createdAt: new Date(),
    });
    return createdTransaction.save();
  }
}
