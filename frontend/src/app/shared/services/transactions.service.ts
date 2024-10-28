import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions(params?: any) {
    HttpParams;
    return this.http.get<any>('http://localhost:3000/transactions/', {
      params: params,
    });
  }
}
