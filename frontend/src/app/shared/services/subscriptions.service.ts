import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription.model';
import { SubscribeUserDto } from '../dtos/subscription.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private http: HttpClient) {}

  getSubscriptions(userId: string) {
    return this.http.get<Subscription[]>(
      environment.apiUrl + '/users/' + userId + '/subscriptions'
    );
  }

  subscribeToFund(userId: string, payload: SubscribeUserDto) {
    return this.http.post<Subscription>(
      environment.apiUrl + '/users/' + userId + '/subscriptions',
      payload
    );
  }

  cancelSubscription(userId: string, subId: string) {
    return this.http.delete<Subscription>(
      environment.apiUrl + '/users/' + userId + '/subscriptions/' + subId
    );
  }
}
