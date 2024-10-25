import { Prop, Schema } from '@nestjs/mongoose';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Schema()
export class Transaction {
  @Prop({ required: true })
  type: TransactionType;
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  fundId: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  timestamp: number;
}
