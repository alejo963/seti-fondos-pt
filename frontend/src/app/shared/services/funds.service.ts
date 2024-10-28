import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fund } from '../models/fund.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  constructor(private http: HttpClient) {}

  getFunds() {
    return this.http.get<Fund[]>(environment.apiUrl + '/funds');
  }
}
