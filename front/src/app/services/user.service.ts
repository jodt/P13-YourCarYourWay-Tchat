import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathService = 'api/user';

  constructor(private httpClient: HttpClient) { }

  addUser(user: User) : Observable<User> {
    return this.httpClient.post<User>(`${this.pathService}/register`, user);
  }
}
