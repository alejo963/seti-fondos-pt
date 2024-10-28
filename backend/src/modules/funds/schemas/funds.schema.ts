import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Fund extends Document {
  @ApiProperty()
  @Prop({ required: true })
  fundName: string;
  @ApiProperty()
  @Prop({ required: true })
  category: string;
  @ApiProperty()
  @Prop({ required: true })
  minSubscriptionAmount: number;
}

export const FundSchema = SchemaFactory.createForClass(Fund);
