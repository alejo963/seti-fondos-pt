import { Fund } from '../../src/modules/funds/schemas/funds.schema';
import { createMockModelProvider, stubMongoId } from './utility.mock';

export const mockFund = (
  fundName = 'Mock Fund',
  category = 'Mock Category',
  minSubscriptionAmount = 100,
  _id = stubMongoId,
) => ({ _id, fundName, category, minSubscriptionAmount });

export const fundModelMockProvider = createMockModelProvider(
  Fund.name,
  mockFund,
);
