import { IsEnum, IsMongoId, IsNumber, IsPositive } from 'class-validator';
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
