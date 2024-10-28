import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription.model';
import { SubscribeUserDto } from '../dtos/subscription.dto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private http: HttpClient) {}

  getSubscriptions(userId: string) {
    return this.http.get<Subscription[]>(
      'http://localhost:3000/users/' + userId + '/subscriptions'
    );
  }

  subscribeToFund(id: string, payload: SubscribeUserDto) {
    return this.http.post<Subscription>(
      'http://localhost:3000/users/' + id + '/subscriptions',
      payload
    );
  }
}
