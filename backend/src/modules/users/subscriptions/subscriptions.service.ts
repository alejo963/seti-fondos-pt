import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscribeUserDto } from './dtos/subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { Model, Types } from 'mongoose';
import { TransactionsService } from '../../transactions/transactions.service';
import { UsersService } from '../users.service';
import { FundsService } from '../../funds/funds.service';
import { TransactionType } from '../../transactions/schemas/transaction.schema';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
    private readonly fundsService: FundsService,
    private readonly notificationsService: NotificationsService,
  ) {}
  async subscribeToFund(id: Types.ObjectId, payload: SubscribeUserDto) {
    const userWallet = (await this.usersService.getUser(id)).wallet;
    const { minSubscriptionAmount, fundName } =
      await this.fundsService.getFundById(payload.fund);

    if (userWallet < payload.amount) {
      throw new HttpException(
        `No tiene saldo disponible para vincularse al fondo ${fundName}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (payload.amount < minSubscriptionAmount) {
      throw new HttpException(
        'El monto es menos de lo mínimo requerido',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingSubscription = await this.subscriptionModel
      .findOne({ user: id, fund: payload.fund })
      .exec();

    if (existingSubscription) {
      throw new HttpException(
        'El usuario ya está suscrito a este fondo',
        HttpStatus.BAD_REQUEST,
      );
    }

    const transaction = await this.transactionsService.createTransaction({
      type: TransactionType.DEPOSIT,
      amount: payload.amount,
      user: id,
      fund: payload.fund,
    });

    const updatedUser = await this.usersService.updateUser(id, {
      wallet: userWallet - payload.amount,
    });

    const createdSubscription = await this.subscriptionModel.create({
      user: id,
      ...payload,
    });

    this.notificationsService.sendNotification(updatedUser, fundName);
    return createdSubscription;
  }

  async getUserSubscriptions(id: Types.ObjectId): Promise<Subscription[]> {
    return await this.subscriptionModel
      .find({ user: id })
      .populate('fund')
      .exec();
  }

  async unsubscribeFromFund(userId: Types.ObjectId, subId: Types.ObjectId) {
    const subscription = await this.subscriptionModel.findById(subId).exec();
    if (!subscription) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
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
    return await this.subscriptionModel
      .deleteOne({ _id: subscription._id })
      .exec();
  }
}
