import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dtos/fund.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Fund } from './schemas/funds.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FundsService {
  constructor(
    @InjectModel(Fund.name) private readonly fundsModel: Model<Fund>,
  ) {}
  async getFunds() {
    return await this.fundsModel.find().exec();
  }

  async getFundById(id: Types.ObjectId): Promise<Fund> {
    return await this.fundsModel.findById(id).exec();
  }

  async createFund(payload: CreateFundDto): Promise<Fund> {
    const createdFund = await this.fundsModel.create(payload);
    return createdFund;
  }
}
