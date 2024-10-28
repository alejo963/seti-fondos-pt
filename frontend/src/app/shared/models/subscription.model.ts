import { Fund } from './fund.model';

export interface Subscription {
  _id: string;
  fund: Fund;
  user: string;
  amount: number;
}
