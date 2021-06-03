import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

  getUser(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API, { params: { id:id }});
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API);
  }

  getUserQuery(query:any): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API, { params: query });
  }

}
