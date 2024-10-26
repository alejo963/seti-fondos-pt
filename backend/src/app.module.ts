import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FundsModule } from './modules/funds/funds.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    FundsModule,
    TransactionsModule,
    NotificationsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
