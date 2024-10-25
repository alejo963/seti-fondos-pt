import { IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';

export class SubscribeUserDto {
  @IsString()
  @IsMongoId()
  fund: string;
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
