import { Fund } from '../../src/modules/funds/schemas/funds.schema';
import { createMockModelProvider } from './utility.mock';

export const mockFund = (
  _id = '1234567890',
  fundName = 'Mock Fund',
  category = 'Mock Category',
  minSubscriptionAmount = 100,
) => ({ _id, fundName, category, minSubscriptionAmount });

export const fundModelMockProvider = createMockModelProvider(
  Fund.name,
  mockFund,
);
