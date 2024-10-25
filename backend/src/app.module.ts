import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { FundModule } from './modules/fund/fund.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './config/env';

const connection = env.mongoConnection
const username = env.username
const password = env.password
const host = env.mongoHost
const database = env.database

const mongoConnection = `${connection}://${username}:${password}@${host}`
console.log(mongoConnection)

@Module({
  imports: [MongooseModule.forRoot(mongoConnection, { dbName: database }), UserModule, FundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
