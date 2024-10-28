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
  user?: string;
  fund?: string;
  type?: string;
  createdBefore?: Date;
  createdAfter?: Date;
  order?: string;
}
