import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import config from '../../config/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, pass } = configService.email;
        return {
          transport: {
            service: 'gmail',
            auth: { user, pass },
          },
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
