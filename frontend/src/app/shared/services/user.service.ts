import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get<User>(environment.apiUrl + '/users/' + id);
  }

  updateUser(id: string, payload: any) {
    return this.http.put<User>(environment.apiUrl + '/users/' + id, payload);
  }
}
