import { Body, Controller, Get, Post } from '@nestjs/common';
import { FundsService } from './funds.service';
import { SubscribeDto} from './dtos/subscribe.dto'

@Controller('funds')
export class FundsController {
    constructor(private readonly fundsService: FundsService) { }

    @Get()
    getFundss() {
        return this.fundsService.getFundss()
    }

    @Post()
    createFunds() {
        return this.fundsService.createFunds()
    }

    @Post('subscribe')
    subscribe(@Body() payload: SubscribeDto) {
        return this.fundsService.subscribe(payload)
    }
}
