import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first } from 'rxjs';
import { User } from './models/User';
import { AppModule } from './app.module';

@Injectable({
  providedIn: AppModule
})
export class UserService {
  url: string = 'http://localhost:3000/'
  users$: Observable<any>;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    this.users$ = this.http.get<any>(this.url)
    return this.users$;
  }

  // getUser(id: any): Observable<any> {
  //   const user = this.users$
  //   return
  // }

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions)
  }
}
