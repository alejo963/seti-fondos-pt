import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FundService {
    constructor (private readonly configService: ConfigService) {}

    getFunds() {
        //TODO: Get list of funds
    }

    createFund() {
    }

    subscribe(payload) {
        console.log(this.configService.get("MONGO_PORT"))
        
        return { payload }
    }
}
