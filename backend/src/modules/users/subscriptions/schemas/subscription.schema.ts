import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Document, Types } from 'mongoose';
import { Fund } from 'src/modules/funds/schemas/funds.schema';

@Schema()
export class Subscription extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: Fund.name })
  fund: Fund | Types.ObjectId;
  @Prop({ required: true })
  amount: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
SubscriptionSchema.index({ user: 1, fund: 1 }, { unique: true });
