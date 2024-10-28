import { Fund } from './fund.model';
import { User } from './user.model';

export interface Transaction {
  _id: string;
  type: string;
  user: string;
  fund: string;
  amount: number;
  createdAt: Date;
}

export interface TransactionQueryParams {
  limit?: number;
  offset?: number;
  user?: User;
  fund?: Fund;
  type?: string;
  createdBefore?: Date;
  createdAfter?: Date;
  order?: string;
}
