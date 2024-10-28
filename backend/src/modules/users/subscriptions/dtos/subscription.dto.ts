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
