export interface Transaction {
  _id: string;
  type: string;
  user: string;
  fund: string;
  amount: number;
  createdAt: Date;
}
