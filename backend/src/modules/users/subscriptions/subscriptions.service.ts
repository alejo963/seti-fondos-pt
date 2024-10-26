import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscribeUserDto } from './dtos/subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { Model, Types } from 'mongoose';
import { TransactionsService } from '../../transactions/transactions.service';
import { UsersService } from '../users.service';
import { FundsService } from '../../funds/funds.service';
import { TransactionType } from '../../transactions/schemas/transaction.schema';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
    private readonly fundsService: FundsService,
  ) {}
  async subscribeToFund(id: Types.ObjectId, payload: SubscribeUserDto) {
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

    const transaction = await this.transactionsService.createTransaction({
      type: TransactionType.DEPOSIT,
      amount: payload.amount,
      user: id,
      fund: payload.fund,
    });

    await this.usersService.updateUser(id, {
      wallet: userWallet - payload.amount,
    });

    const createdSubscription = new this.subscriptionModel({
      user: id,
      ...payload,
    });
    return createdSubscription.save();
  }

  async getUserSubscriptions(id: Types.ObjectId) {
    return await this.subscriptionModel
      .find({ user: id })
      .populate('fund')
      .exec();
  }

  async unsubscribeFromFund(userId: Types.ObjectId, fundId: Types.ObjectId) {
    const subscription = await this.subscriptionModel
      .findOne({ _id: fundId })
      .exec();
    if (!subscription) {
      throw new HttpException(
        'User is not subscribed to this fund',
        HttpStatus.NOT_FOUND,
      );
    }

    const transaction = await this.transactionsService.createTransaction({
      type: TransactionType.WITHDRAW,
      amount: subscription.amount,
      user: userId,
      fund: subscription.fund as Types.ObjectId,
    });

    const userWallet = (await this.usersService.getUser(userId)).wallet;
    await this.usersService.updateUser(userId, {
      wallet: subscription.amount + userWallet,
    });
    await this.subscriptionModel.deleteOne({ _id: subscription._id }).exec();
  }
}
