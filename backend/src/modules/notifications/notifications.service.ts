import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '../../config/env';

@Injectable()
export class NotificationsService {
  sesClient: SESClient;
  constructor() {
    this.sesClient = new SESClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AASDFASDGSD', // TODO: Replace with your actual access key
        secretAccessKey: 'sdhias789ysoiuhasd',
      },
    });
  }
  createSendEmailCommand(toAddress: string, fromAddress: string) {
    return new SendEmailCommand({
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Body: {
          //   Html: {
          //     Charset: 'UTF-8',
          //     Data: 'TEXT_FORMAT_BODY',
          //   },
          Text: {
            Charset: 'UTF-8',
            Data: 'TEXT_FORMAT_BODY',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'EMAIL_SUBJECT',
        },
      },
      Source: fromAddress,
    });
  }

  async notifyByEmail() {
    const sendEmailCommand = this.createSendEmailCommand(
      'receiver@gmail.com',
      'sender@gmail.com',
    );

    try {
      return await this.sesClient.send(sendEmailCommand);
    } catch (e) {
      console.error('Failed to send email.');
      return e;
    }
  }
}
