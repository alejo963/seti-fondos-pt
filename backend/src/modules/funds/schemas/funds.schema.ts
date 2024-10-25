import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Fund extends Document {
  @Prop({ required: true })
  fundName: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  minSubscriptionAmount: number;
}

export const FundSchema = SchemaFactory.createForClass(Fund);
