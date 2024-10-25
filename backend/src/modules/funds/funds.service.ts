import { Injectable } from '@nestjs/common';

@Injectable()
export class FundsService {
  getFunds() {
    //TODO: Get list of funds
  }

  createFunds() {}

  subscribe(payload) {
    return { payload };
  }
}
