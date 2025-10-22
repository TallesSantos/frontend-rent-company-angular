import { SERVER_URL } from './../../../env/env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequestSchema } from '../../../models/request/sign-up-request-schema';
import { UserSchema } from '../../../models/user-schema';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../models/response/auth-response';
import { API_CREDENTIAL } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) {}


   login(username:string, password:string):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(SERVER_URL + API_CREDENTIAL.BASE_PATH + API_CREDENTIAL.LOGIN, {username, password}, {})
    }

    signUp(request: SignInRequestSchema):Observable<AuthResponse>{
          return this.http.post<AuthResponse>(SERVER_URL + API_CREDENTIAL.BASE_PATH + API_CREDENTIAL.SIGN_UP, request, {})
    }
}

