import { Subscription } from '../../src/modules/users/subscriptions/schemas/subscription.schema';
import { createMockModelProvider } from './utility.mock';

export const mockSubscription = (
  _id = '1234567890',
  user = '1234567890',
  fund = '1234567890',
  amount = 50000,
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
