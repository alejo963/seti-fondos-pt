import { Injectable } from '@nestjs/common';
import { NotificationMethod, User } from '../users/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  snsClient: SNSClient;
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.snsClient = new SNSClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }
  async sendNotification(user: User, fundName: string) {
    if (user.notificationMethod === NotificationMethod.EMAIL) {
      return await this.sendEmail(user, fundName);
    }
    return await this.sendSms(user, fundName);
  }

  async sendEmail(user: User, fundName: string) {
    const message = `Hola ${user.firstName} ${user.lastName}! \nTe has subscrito al fondo ${fundName}`;

    this.mailerService.sendMail({
      from: 'avelasquez@cidenet.com.co',
      to: user.email,
      subject: 'Nueva suscripción',
      text: message,
    });
  }

  async sendSms(user: User, fundName: string) {
    const message = `Hola ${user.firstName} ${user.lastName}! Te has subscrito al fondo ${fundName}`;
    const params = {
      Message: message,
      PhoneNumber: user.phoneNumber,
    };
    const command = new PublishCommand(params);
    await this.snsClient.send(command);
  }
}
