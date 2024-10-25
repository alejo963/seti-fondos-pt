import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { FundModule } from './module/fund/fund.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), UserModule, FundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
