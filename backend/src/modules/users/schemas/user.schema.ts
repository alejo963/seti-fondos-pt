import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export enum NotificationMethod {
  EMAIL = 'email',
  SMS = 'sms',
}

@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true })
  firstName: string;
  @ApiProperty()
  @Prop({ required: true })
  lastName: string;
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;
  @ApiProperty()
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @ApiProperty()
  @Prop({ required: true, unique: true })
  nationalId: string;
  @ApiProperty()
  @Prop({ required: true })
  wallet: number;
  @ApiProperty({ enum: NotificationMethod })
  @Prop({ required: true })
  notificationMethod: NotificationMethod;
}

export const UserSchema = SchemaFactory.createForClass(User);
