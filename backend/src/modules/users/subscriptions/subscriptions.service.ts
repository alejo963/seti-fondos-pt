import { Injectable } from '@nestjs/common';
import { SubscribeUserDto } from './dtos/subscription.dto';

@Injectable()
export class SubscriptionsService {
  //   constructor(private readonly subscriptionModel) {}
  async subscribeToFund(id: string, payload: SubscribeUserDto) {
    // this.subscriptionModel.updateOne({ _id: id });
  }

  async getUserSubscriptions(id: string) {}

  async unsubscribeFromFund(id: string, fundId: string) {}
}
