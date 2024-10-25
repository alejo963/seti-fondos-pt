import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFundDto {
  @IsString()
  fundName: string;
  @IsString()
  category: string;
  @IsNumber()
  @IsPositive()
  minSubscriptionAmount: number;
}

export class UpdateFundDto extends PartialType(CreateFundDto) {}