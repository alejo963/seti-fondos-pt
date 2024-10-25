import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dtos/fund.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Fund } from './schemas/funds.schema';
import { Model } from 'mongoose';

@Injectable()
export class FundsService {
  constructor(
    @InjectModel(Fund.name) private readonly fundsModel: Model<Fund>,
  ) {}
  getFunds() {
    //TODO: Get list of funds
  }

  getFundById(id: string) {
    return this.fundsModel.findById(id).exec();
  }

  createFund(payload: CreateFundDto) {
    const createdFund = new this.fundsModel(payload);
    return createdFund.save();
  }
}