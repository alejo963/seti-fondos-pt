import {
  Transaction,
  TransactionType,
} from '../../src/modules/transactions/schemas/transaction.schema';
import { createMockModelProvider } from './utility.mock';

export const mockTransaction = (
  _id = '1234567890',
  type = TransactionType.DEPOSIT,
  user = '1234567890',
  fund = '1234567890',
  amount = 75000,
  createdAt = new Date(),
) => ({ _id, type, user, fund, amount, createdAt });

export const transactionModelMockProvider = createMockModelProvider(
  Transaction.name,
  mockTransaction,
);
