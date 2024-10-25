import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dtos/fund.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Fund } from './schemas/funds.schema';
import { Model } from 'mongoose';

@Injectable()
export class FundsService {
  constructor(
    @InjectModel(Fund.name) private readonly fundModel: Model<Fund>,
  ) {}
  getFunds() {
    //TODO: Get list of funds
  }

  getFundById(id: string) {}

  createFund(payload: CreateFundDto) {
    const createdFund = new this.fundModel(payload);
    return createdFund.save();
  }
}
