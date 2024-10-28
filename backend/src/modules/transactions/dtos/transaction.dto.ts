import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { TransactionType } from '../schemas/transaction.schema';
import { Types } from 'mongoose';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsEnum(TransactionType)
  type: TransactionType;
  @IsMongoId()
  user: Types.ObjectId;
  @IsMongoId()
  fund: Types.ObjectId;
}

export class FilterTransactionsDto {
  @IsOptional()
  @IsPositive()
  limit?: number;
  @IsOptional()
  @Min(0)
  offset?: number;
  @IsEnum(Order)
  @IsOptional()
  order?: Order;
}
