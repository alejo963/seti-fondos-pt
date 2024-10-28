import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }

  updateUser(id: string, payload: any) {
    return this.http.put<User>('http://localhost:3000/users/' + id, payload);
  }
}
