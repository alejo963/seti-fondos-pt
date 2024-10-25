import { Body, Controller, Get, Post } from '@nestjs/common';
import { FundService } from './fund.service';
import { SubscribeDto} from './dtos/subscribe.dto'

@Controller('fund')
export class FundController {
    constructor(private readonly fundService: FundService) { }

    @Get()
    getFunds() {
        return this.fundService.getFunds()
    }

    @Post()
    createFund() {
        return this.fundService.createFund()
    }

    @Post('subscribe')
    subscribe(@Body() payload: SubscribeDto) {
        return this.fundService.subscribe(payload)
    }
}
