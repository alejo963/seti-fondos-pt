import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '../../config/env';
import { NotificationMethod, User } from '../users/schemas/user.schema';

@Injectable()
export class NotificationsService {
  sesClient: SESClient;
  constructor() {
    this.sesClient = new SESClient({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId, // TODO: Replace with your actual access key
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
  }
  createSendEmailCommand(
    userAddress: string,
    userName: string,
    fundName: string,
  ) {
    // return new SendEmailCommand({
    //   Destination: {
    //     ToAddresses: [userAddress],
    //   },
    //   Message: {
    //     Body: {
    //       //   Html: {
    //       //     Charset: 'UTF-8',
    //       //     Data: 'TEXT_FORMAT_BODY',
    //       //   },
    //       Text: {
    //         Charset: 'UTF-8',
    //         Data: 'TEXT_FORMAT_BODY',
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: 'EMAIL_SUBJECT',
    //     },
    //   },
    //   Source: 'fromAddress@gmail.com',
    // });
  }

  async sendNotification(user: User, fundName: string) {
    if (user.notificationMethod === NotificationMethod.EMAIL) {
      return await this.sendNoticationbyEmail(user, fundName);
    }
    return await this.sendNotificationBySms(user, fundName);
  }

  async sendNoticationbyEmail(user: User, fundName: string) {
    const sendEmailCommand = this.createSendEmailCommand(
      user.email,
      user.firstName,
      fundName,
    );

    try {
      // return await this.sesClient.send(sendEmailCommand);
    } catch (e) {
      console.error('Failed to send email.');
      return e;
    }
  }

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
