import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscribeUserDto } from './dtos/subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { Model } from 'mongoose';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { UsersService } from '../users.service';
import { FundsService } from 'src/modules/funds/funds.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
    private readonly fundsService: FundsService,
  ) {}
  async subscribeToFund(id: string, payload: SubscribeUserDto) {
    const userWallet = (await this.usersService.getUser(id)).wallet;

    if (userWallet < payload.amount) {
      throw new HttpException(
        'There is not enough money on wallet',
        HttpStatus.BAD_REQUEST,
      );
    }

    const minSubAmount = (await this.fundsService.getFundById(payload.fund))
      .minSubscriptionAmount;
    if (payload.amount < minSubAmount) {
      throw new HttpException(
        'Amount is less than min required amount',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingSubscription = await this.subscriptionModel
      .findOne({ user: id, fund: payload.fund })
      .exec();

    if (existingSubscription) {
      throw new HttpException(
        'User is already subscribed to this fund',
        HttpStatus.BAD_REQUEST,
      );
    }

    //TODO: add transaction
    await this.usersService.updateUser(id, {
      wallet: userWallet - payload.amount,
    });

    const createdSubscription = new this.subscriptionModel({
      user: id,
      ...payload,
    });
    return createdSubscription.save();
  }

  async getUserSubscriptions(id: string) {}

  async unsubscribeFromFund(id: string, fundId: string) {}
}
