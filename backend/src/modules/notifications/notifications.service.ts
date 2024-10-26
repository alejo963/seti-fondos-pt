import { Injectable } from '@nestjs/common';
import { NotificationMethod, User } from '../users/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}
  async sendNotification(user: User, fundName: string) {
    if (user.notificationMethod === NotificationMethod.EMAIL) {
      return await this.sendEmail(user, fundName);
    }
    return await this.sendSms(user, fundName);
  }

  async sendEmail(user: User, fundName: string) {
    const message = `Hola ${user.firstName} ${user.lastName}! \nTe has subscrito al fondo ${fundName}`;

    this.mailerService.sendMail({
      from: 'avelaquez@cidenet.com.co',
      to: user.email,
      subject: 'Nueva subscripción',
      text: message,
    });
  }

  async sendSms(user: User, fundName: string) {
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
