import { Injectable } from '@nestjs/common';


@Injectable()
export class FundService {

    getFunds() {
        //TODO: Get list of funds
    }

    createFund() {
    }

    subscribe(payload) {
        
        return { payload }
    }
}
