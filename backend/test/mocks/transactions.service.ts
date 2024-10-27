import {
  Transaction,
  TransactionType,
} from '../../src/modules/transactions/schemas/transaction.schema';
import { createMockModelProvider, stubMongoId } from './utility.mock';

export const mockTransaction = (
  createdAt = new Date(),
  type = TransactionType.DEPOSIT,
  user = stubMongoId,
  fund = stubMongoId,
  amount = 75000,
  _id = stubMongoId,
) => ({ _id, type, user, fund, amount, createdAt });

export const transactionModelMockProvider = createMockModelProvider(
  Transaction.name,
  mockTransaction,
);
