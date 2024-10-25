import { IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SubscribeUserDto {
  @IsString()
  @IsMongoId()
  fund: Types.ObjectId;
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class UnsubscribeUserDto {
  @IsString()
  userId: string;
  @IsString()
  fundId: string;
}
