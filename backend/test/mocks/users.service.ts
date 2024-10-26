import {
  NotificationMethod,
  User,
} from '../../src/modules/users/schemas/user.schema';
import { createMockModelProvider } from './utility.mock';

export const mockUser = (
  _id = '1234567890',
  firstName = 'Pepito',
  lastName = 'Perez',
  nationalId = '123456789',
  wallet = 500000,
  notificationMethod = NotificationMethod.EMAIL,
) => ({ _id, firstName, lastName, nationalId, wallet, notificationMethod });

export const userModelMockProvider = createMockModelProvider(
  User.name,
  mockUser,
);
