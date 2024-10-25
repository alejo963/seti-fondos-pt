import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import {
  Subscription,
  SubscriptionSchema,
} from './subscriptions/schemas/subscription.schema';
import { TransactionsModule } from '../transactions/transactions.module';
import { FundsModule } from '../funds/funds.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    TransactionsModule,
    FundsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, SubscriptionsService],
})
export class UsersModule {}
