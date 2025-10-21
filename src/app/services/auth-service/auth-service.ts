import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequestSchema } from '../../../models/request/sign-up-request-schema';
import { UserSchema } from '../../../models/user-schema';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../models/response/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) {}

    private API_AUTH = "http://localhost:8080/api-credentials/api/auth"

   login(username:string, password:string):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(this.API_AUTH + "/login", {username, password}, {})
    }

    signUp(request: SignInRequestSchema):Observable<AuthResponse>{
          return this.http.post<AuthResponse>(this.API_AUTH + "/sign-up", request, {})
    }
}

