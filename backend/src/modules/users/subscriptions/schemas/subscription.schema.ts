import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Subscription {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  fundId: string;
  @Prop({ required: true })
  amount: number;
}
