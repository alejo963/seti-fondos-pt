import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Fund } from '../models/fund.model';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  constructor(private http: HttpClient) {}

  getFunds() {
    return this.http.get<Fund[]>('localhost:3000/funds');
  }
}
