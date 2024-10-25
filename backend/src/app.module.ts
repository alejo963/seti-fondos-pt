import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { FundModule } from './modules/fund/fund.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost:27017`),ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), UserModule, FundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
