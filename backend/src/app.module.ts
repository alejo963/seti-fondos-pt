import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FundsModule } from './modules/funds/funds.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './config/env';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

const connection = env.mongoConnection;
const username = env.username;
const password = env.password;
const host = env.mongoHost;
const database = env.database;

const mongoConnection = `${connection}://${username}:${password}@${host}`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoConnection, { dbName: database }),
    UsersModule,
    FundsModule,
    TransactionsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
