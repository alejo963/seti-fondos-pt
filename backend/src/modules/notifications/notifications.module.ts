import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { env } from '../../config/env';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.emailHost,
        port: env.emailPort,
        secure: true,
        auth: {
          user: env.awsAccessKeyId,
          pass: env.awsSecretAccessKey,
        },
      },
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
