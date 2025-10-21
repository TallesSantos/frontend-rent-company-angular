import { RentHistory } from './../../pages/user/rent-history/rent-history';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './../local-storage-service/local-storage-service';
import { UserSchema } from '../../../models/user-schema';
import { AddressRequest, PhoneRequest } from '../../../models/request/user-profile-request';
import { MovieSchema } from '../../../models/movie-schema';

@Injectable({
    providedIn: 'root',
})
export class UseService {

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

    private API_USERS = 'http://localhost:8080/api-curser/api/users';

    private token: string = '';

    //Usuario sincronizado
    private userSubject = new BehaviorSubject<UserSchema | null>(null);
    user$ = this.userSubject.asObservable();

    setUser(user: UserSchema | null) {
        this.userSubject.next(user);
    }

    getUser(): UserSchema | null {
        return this.userSubject.value;
    }

    getUserOfToken(): Observable<UserSchema> {
        return this.http
            .get<UserSchema>(`${this.API_USERS}/get-current-user`, {
                headers: { Authorization: `Bearer ${this.token}` },
            })
            .pipe(tap((user) => this.setUser(user)));
    }

    //Rent history sincronizado

    private reloadTrigger = new BehaviorSubject<void>(undefined);

    reloadRentMovies$ = this.reloadTrigger.asObservable();

    triggerReloadListOfRentMovies() {
        this.reloadTrigger.next();
    }

    getToken(): string {
        return this.token;
    }

    setToken(token: string) {
        if (!token) {
            this.token = '';
            this.localStorageService.removeOfLocalStorage('token');
        } else {
            this.localStorageService.saveInLocalStorage('token', token);
            this.token = token;
        }
    }

    addAddress(request: Omit<AddressRequest, 'id'>): Observable<void> {
        return this.http
            .post<void>(`${this.API_USERS}/current-user/addresses`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken().subscribe()) // Atualiza usuário após adicionar
            );
    }

    updateAddress(request: AddressRequest): Observable<void> {
        return this.http
            .put<void>(`${this.API_USERS}/current-user/addresses`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken().subscribe()) // Atualiza usuário após atualizar
            );
    }

    removeAddress(id: number): Observable<void> {
        return this.http
            .delete<void>(`${this.API_USERS}/current-user/addresses`, {
                body: { id },
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken().subscribe()) // Atualiza usuário após remover
            );
    }

    addPhone(request: Omit<PhoneRequest, 'id'>): Observable<void> {
        return this.http
            .post<void>(`${this.API_USERS}/current-user/phones`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken().subscribe()) // Atualiza usuário após adicionar
            );
    }

    updatePhone(request: PhoneRequest): Observable<void> {
        return this.http
            .put<void>(`${this.API_USERS}/current-user/phones`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken().subscribe()) // Atualiza usuário após atualizar
            );
    }

    removePhone(id: number): Observable<void> {
        return this.http
            .delete<void>(`${this.API_USERS}/current-user/phones`, {
                body: { id },
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken().subscribe()) // Atualiza usuário após remover
            );
    }

    listAllHistoryOfClient(): Observable<MovieSchema[]> {
        return this.http

            .get<MovieSchema[]>(
                `${this.API_USERS.substring(0, 36)}/clients/current-user/rent-history`,
                {
                    headers: { Authorization: `Bearer ${this.getToken()}` },
                }
            )
            .pipe(
                tap((rentHistory) => {
                    return rentHistory.map((m) => {
                        return { ...m, image_url: m.image_url !== undefined? m?.image_url : m?.imageUrl };
                    });
                })
            );
    }
}
