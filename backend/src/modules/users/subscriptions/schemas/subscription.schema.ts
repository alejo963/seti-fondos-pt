import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Document, Types } from 'mongoose';
import { Fund } from '../../../funds/schemas/funds.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Subscription extends Document {
  @ApiProperty({ type: String })
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;
  @ApiProperty({ type: Fund })
  @Prop({ required: true, type: Types.ObjectId, ref: Fund.name })
  fund: Fund | Types.ObjectId;
  @ApiProperty()
  @Prop({ required: true })
  amount: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
SubscriptionSchema.index({ user: 1, fund: 1 }, { unique: true });
