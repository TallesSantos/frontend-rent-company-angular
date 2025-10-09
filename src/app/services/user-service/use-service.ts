import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSchema } from '../../../models/user-schema';

@Injectable({
  providedIn: 'root'
})
export class UseService {


  constructor(private http: HttpClient) {}


    private userSubject = new BehaviorSubject<UserSchema | null>(null);
    user$ = this.userSubject.asObservable(); // para os componentes observarem

    setUser(user: UserSchema | null) {
    this.userSubject.next(user);
    }

    getUser(): UserSchema | null {
    return this.userSubject.value;
    }

    private apiUsers = '/api-curser/api/users';

    login(username:string, password:string):Observable<UserSchema>{
        return this.http.post<UserSchema>(this.apiUsers + "/login", {username, password}, {})
    }

}
