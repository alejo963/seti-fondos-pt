import { Module } from '@nestjs/common';
import { FundsController } from './funds.controller';
import { FundsService } from './funds.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Fund, FundSchema } from './schemas/funds.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fund.name, schema: FundSchema }]),
  ],
  controllers: [FundsController],
  providers: [FundsService],
  exports: [FundsService],
})
export class FundsModule {}
