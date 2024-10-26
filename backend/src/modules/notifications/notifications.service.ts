import { Injectable } from '@nestjs/common';
import { env } from '../../config/env';
import { NotificationMethod, User } from '../users/schemas/user.schema';

@Injectable()
export class NotificationsService {
  async sendNotification(user: User, fundName: string) {
    if (user.notificationMethod === NotificationMethod.EMAIL) {
      return await this.sendNoticationbyEmail(user, fundName);
    }
    return await this.sendNotificationBySms(user, fundName);
  }

  async sendNoticationbyEmail(user: User, fundName: string) {}

  async sendNotificationBySms(user: User, fundName: string) {
    if (user.notificationMethod === NotificationMethod.SMS) {
      return await this.createSendSmsCommand(user.phoneNumber, fundName);
    }
  }

  async createSendSmsCommand(phoneNumber: string, fundName: string) {
    // return new SendSmsCommand({
    //   Destination: {
    //     PhoneNumber: phoneNumber,
    //   },
    //   Message: {
    //     Charset: 'UTF-8',
    //     Data: 'TEXT_FORMAT_BODY',
    //   },
    //   Source: 'fromAddress@gmail.com',
    // });
  }
}
