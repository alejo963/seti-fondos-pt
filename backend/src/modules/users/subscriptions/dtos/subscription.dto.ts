import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SubscribeUserDto {
  @IsString()
  @IsMongoId()
  @ApiProperty({type: String})
  fund: Types.ObjectId;
  @IsNumber()
  @IsPositive()
  amount: number;
}
