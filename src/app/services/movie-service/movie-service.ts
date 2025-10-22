import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieSchema } from '../../../models/movie-schema';
import { createSoapBody, createSoapEnvelope } from '../soap-util';
import { createMovieSchema } from '../movie-util';
import { UseService } from '../user-service/use-service';
import { API_CURSER, SERVER_URL } from '../../../env/env';

@Injectable({
    providedIn: 'root',
})
export class MovieService {

    private reloadTrigger = new BehaviorSubject<void>(undefined);

    reloadListOfMovies$ = this.reloadTrigger.asObservable();

    triggerReloadListOfMovies() {
        this.reloadTrigger.next();
    }

    constructor(private http: HttpClient, private userService: UseService) {

    }

    listAllMovies(): Observable<MovieSchema[]> {
        return this.http
            .post(SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.SOAP.MOVIE_PATH, createSoapEnvelope('listAll'), {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8',
                    SOAPAction: '',
                    action: 'listAll',
                },
                responseType: 'text',
            })
            .pipe(
                map((response: string) => {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(response, 'application/xml');
                    const items = xml.getElementsByTagName('return');
                    const movies: MovieSchema[] = [];

                    for (let i = 0; i < items.length; i++) {
                        const movie: MovieSchema = createMovieSchema(items[i]);
                        movies.push(movie);
                    }

                    return movies;
                }),
                catchError((err) => {
                    console.error('Erro na requisição SOAP:', err);
                    throw err;
                })
            );
    }

    createMovie(name: string, description: string, imageUrl: string): Observable<string> {
        const body = createSoapBody([
            {
                properties: [
                    `<name> ${name}</name> `,
                    `<description> ${description}</description> `,
                    `<imageUrl> ${imageUrl}</imageUrl> `,
                ],
            },
        ]);

        return this.http.post(SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.SOAP.MOVIE_PATH, createSoapEnvelope('createMovie', body), {
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: '',
                Authorization: `Bearer ${this.userService.getToken()}`,
            },
            responseType: 'text',
        });
    }

    editMovie(id: number, request: MovieSchema): Observable<string> {
        const requestProperties = [`<id>${id}</id>`];
        if (request.name) {
            requestProperties.push(`<name>${request.name}</name>`);
        }
        if (request.description) {
            requestProperties.push(`<description>${request.description}</description>`);
        }

        if (request.image_url) {
            requestProperties.push(`<imageUrl>${request.image_url}</imageUrl>`);
        }

        const body = createSoapBody([
            {
                properties: requestProperties,
            },
        ]);

        return this.http.post(SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.SOAP.MOVIE_PATH, createSoapEnvelope('updateMovie', body), {
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: '',
                Authorization: `Bearer ${this.userService.getToken()}`,
            },
            responseType: 'text',
        });
    }

    deleteMovie(id: number): Observable<string> {
        const body = `
            <arg0> ${id} </arg0>
        `;

        return this.http.post(SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.SOAP.MOVIE_PATH, createSoapEnvelope('deleteMovie', body), {
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: '',
                Authorization: `Bearer ${this.userService.getToken()}`,
            },
            responseType: 'text',
        });
    }

    rentMovie(idClient: number, idMovie: number): Observable<string> {
        const body = `
            <arg0> ${idClient} </arg0>
            <arg1> ${idMovie} </arg1>
        `;

        const soapEnvelop = createSoapEnvelope('rentMovie', body);
        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.SOAP.CLIENT_PATH
        console.log("url" + url)
        return this.http.post(url, soapEnvelop, {
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: '',
                Authorization: `Bearer ${this.userService.getToken()}`,
            },
            responseType: 'text',
        });
    }

    returnMovie(idClient: number, idMovie: number): Observable<string> {
        const body = `
            <arg0> ${idClient} </arg0>
            <arg1> ${idMovie} </arg1>
        `;

        const url = SERVER_URL + API_CURSER.BASE_PATH + API_CURSER.SOAP.CLIENT_PATH
        console.log("url", url)

        return this.http.post(url, createSoapEnvelope('returnMovie', body), {
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                SOAPAction: '',
                Authorization: `Bearer ${this.userService.getToken()}`,
            },
            responseType: 'text',
        });
    }
}
