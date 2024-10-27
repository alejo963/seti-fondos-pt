import { Types } from 'mongoose';
import {
  NotificationMethod,
  User,
} from '../../src/modules/users/schemas/user.schema';
import { createMockModelProvider } from './utility.mock';

export const mockUser = (
  firstName = 'Pepito',
  lastName = 'Perez',
  nationalId = '123456789',
  wallet = 500000,
  notificationMethod = NotificationMethod.EMAIL,
  email = 'oG3U8@example.com',
  phoneNumber = '123456789',
  _id: Types.ObjectId = new Types.ObjectId('671d30ff2d178e227a88e463'),
) => ({
  _id,
  firstName,
  lastName,
  nationalId,
  wallet,
  notificationMethod,
  email,
  phoneNumber,
});

export const userModelMockProvider = createMockModelProvider(
  User.name,
  mockUser,
);
