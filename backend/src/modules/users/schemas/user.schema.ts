import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  nationalId: string;
  @Prop({ required: true })
  wallet: number;
  @Prop()
  subscriptions: Subscription[];
}

export class Subscription {
  @Prop({ required: true })
  readonly fundsId: string;

  @Prop({ required: true })
  readonly amount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
