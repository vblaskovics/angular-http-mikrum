import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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

  handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error Code: ${err.status}, Message: ${err.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }

}
