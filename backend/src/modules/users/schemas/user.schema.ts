import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum NotificationMethod {
  EMAIL = 'email',
  SMS = 'sms',
}

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, unique: true })
  nationalId: string;
  @Prop({ required: true })
  wallet: number;
  @Prop({ required: true })
  notificationMethod: NotificationMethod;
}

export const UserSchema = SchemaFactory.createForClass(User);
