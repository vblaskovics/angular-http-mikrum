import { Component, OnInit } from '@angular/core';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-http';

  user: User;
  users: User[];

  username: string;
  id: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser('1').subscribe(
      (res) => {
        this.user = res[0];
      },
      (err) => {
        this.userService.handleError(err);
      }
    );

    this.userService.getUsers()
      .pipe(
        tap((res) => console.log('getUser response here!', res)),
        catchError((res) => {
          return of([{
            id: 0,
            name: '-',
            username: '-',
            email: '-'
          }])
        })
      ).subscribe(
        (res) => {
          this.users = res;
        },
        (err) => {
          this.userService.handleError(err);
        }
      )
  }

  onQuery(): void {
    let query: any = {};
    if (this.id) {
      query.id = this.id;
    }
    if (this.username) {
      query.username = this.username;
    }

    this.userService.getUserQuery(query).subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        this.userService.handleError(err);
      }
    )
  }


}
