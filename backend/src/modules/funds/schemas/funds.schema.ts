import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Fund {
  @Prop({ required: true })
  fundName: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  minSubscriptionAmount: number;
}

export const FundSchema = SchemaFactory.createForClass(Fund);
