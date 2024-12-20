import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fund } from '../../funds/schemas/funds.schema';
import { User } from '../../users/schemas/user.schema';

export enum TransactionType {
  DEPOSIT = 'Deposito',
  WITHDRAW = 'Retiro',
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
