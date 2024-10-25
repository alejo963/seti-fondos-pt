import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fund } from 'src/modules/funds/schemas/funds.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Schema({
  timeseries: {
    enabled: true,
    timeField: 'createdAt',
    metaField: 'type',
    granularity: 'milliseconds',
  },
})
export class Transaction extends Document {
  @Prop({ required: true })
  type: TransactionType;
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: string;
  @Prop({ required: true, type: Types.ObjectId, ref: Fund.name })
  fund: string;
  @Prop({ required: true })
  amount: number;
  @Prop()
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
