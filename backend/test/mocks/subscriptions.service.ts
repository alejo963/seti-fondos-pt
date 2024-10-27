import { Subscription } from '../../src/modules/users/subscriptions/schemas/subscription.schema';
import { createMockModelProvider, stubMongoId } from './utility.mock';

export const mockSubscription = (
  user = '1234567890',
  fund = '1234567890',
  amount = 50000,
  _id = stubMongoId,
) => ({
  _id,
  user,
  fund,
  amount,
});

export const subscriptionModelMockProvider = createMockModelProvider(
  Subscription.name,
  mockSubscription,
);
