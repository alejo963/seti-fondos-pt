import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { TransactionType } from '../schemas/transaction.schema';
import { Types } from 'mongoose';

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
  limit: number;
  @IsPositive()
  @IsOptional()
  @Min(0)
  offset: number;
  @IsOptional()
  @IsMongoId()
  user?: Types.ObjectId;
  @IsMongoId()
  @IsOptional()
  fund?: Types.ObjectId;
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;
}