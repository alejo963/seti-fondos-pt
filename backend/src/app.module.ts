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
import { environments } from './environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: environments[process.env.NODE_ENV] || '.env',
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
