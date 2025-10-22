import { RentHistory } from './../../pages/user/rent-history/rent-history';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './../local-storage-service/local-storage-service';
import { UserSchema } from '../../../models/user-schema';
import { AddressRequest, PhoneRequest } from '../../../models/request/user-profile-request';
import { MovieSchema } from '../../../models/movie-schema';
import { API_CURSER, SERVER_URL } from '../../../env/env';

@Injectable({
    providedIn: 'root',
})
export class UseService {

    protected user: UserSchema | null = null;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    private API_USERS = 'http://localhost:8080/api-curser/api/users';

    //Usuario sincronizado
    private userSubject = new BehaviorSubject<UserSchema | null>(null);
    user$ = this.userSubject.asObservable();

    setUserFromBackend(token: string) {

        this.user$
            .pipe(() => this.getUserOfToken(token))
            .subscribe({
                next: (user: UserSchema) => {
                    this.user = user;
                },
                error: (err: any) => {
                    this.user = null;
                    console.error('Erro ao carregar usuario:', err);
                },
            });
        this.userSubject.next(this.user);
    }

    getUser(): UserSchema | null {
        return this.user;
    }

    getUserOfToken(token: string): Observable<UserSchema> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.GET_CURRENT_USER;
        return this.http
            .get<UserSchema>(`${url}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .pipe(tap((user) => this.user = user));
    }

    //Rent history sincronizado

    private reloadTrigger = new BehaviorSubject<void>(undefined);

    reloadRentMovies$ = this.reloadTrigger.asObservable();

    triggerReloadListOfRentMovies() {
        this.reloadTrigger.next();
    }

        setToken(token: string) {
       this.localStorageService.saveInLocalStorage("token", token)
    }

    getToken(): string {
        try {
            const token = this.localStorageService.getFromLocalStorage('token');
            const treatedToken = token.substring(1, token.length - 1);
            return treatedToken;


        } catch (e) {
            console.log(e)
            return ""
        }


    }

    removeToken() {
        this.localStorageService.removeOfLocalStorage('token');
    }

    addAddress(request: Omit<AddressRequest, 'id'>): Observable<void> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.ADDRESSES;

        return this.http
            .post<void>(`${url}`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken(this.getToken()).subscribe()) // Atualiza usuário após adicionar
            );
    }

    updateAddress(request: AddressRequest): Observable<void> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.ADDRESSES;

        return this.http
            .put<void>(`${url}`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken(this.getToken()).subscribe()) // Atualiza usuário após atualizar
            );
    }

    removeAddress(id: number): Observable<void> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.ADDRESSES;

        return this.http
            .delete<void>(`${url}`, {
                body: { id },
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken(this.getToken()).subscribe()) // Atualiza usuário após remover
            );
    }

    addPhone(request: Omit<PhoneRequest, 'id'>): Observable<void> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.PHONES;

        return this.http
            .post<void>(`${url}`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken(this.getToken()).subscribe()) // Atualiza usuário após adicionar
            );
    }

    updatePhone(request: PhoneRequest): Observable<void> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.PHONES;

        return this.http
            .put<void>(`${url}`, request, {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken(this.getToken()).subscribe()) // Atualiza usuário após atualizar
            );
    }

    removePhone(id: number): Observable<void> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.USER.BASE_PATH + API_CURSER.REST.USER.PHONES;

        return this.http
            .delete<void>(`${url}`, {
                body: { id },
                headers: { Authorization: `Bearer ${this.getToken()}` },
            })
            .pipe(
                tap(() => this.getUserOfToken(this.getToken()).subscribe()) // Atualiza usuário após remover
            );
    }

    listAllHistoryOfClient(): Observable<MovieSchema[]> {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.CLIENT.BASE_PATH + API_CURSER.REST.CLIENT.RENT_HISTORY;

        return this.http
            .get<MovieSchema[]>(
                `${url}`,
                {
                    headers: { Authorization: `Bearer ${this.getToken()}` },
                }
            )
            .pipe(
                tap((rentHistory) => {
                    return rentHistory.map((m) => {
                        return {
                            ...m,
                            image_url: m.image_url !== undefined ? m?.image_url : m?.imageUrl,
                        };
                    });
                })
            );
    }

    comment(movieId: number, commentParentId: number | undefined, text: string) {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.CLIENT.BASE_PATH + API_CURSER.REST.CLIENT.ADD_COMMENT;

        return this.http.post<MovieSchema[]>(
            `${url}`,
            { movieId, parentId: commentParentId, commentText: text },
            {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            }
        );
    }
    updateComment(id: number | undefined, text: string) {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.CLIENT.BASE_PATH + API_CURSER.REST.CLIENT.UPDATE_COMMENT;

        return this.http.put<MovieSchema[]>(
            `${url}`,
            {
                id,
                commentText: text,
            },
            {
                headers: { Authorization: `Bearer ${this.getToken()}` },
            }
        );
    }

    removeComment(id: number | undefined) {
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.REST.CLIENT.BASE_PATH + API_CURSER.REST.CLIENT.REMOVE_COMMENT;

        return this.http.delete<MovieSchema[]>(
            `${url}`,

            {
                body: { id },
                headers: { Authorization: `Bearer ${this.getToken()}` },
            }
        );
    }
}
