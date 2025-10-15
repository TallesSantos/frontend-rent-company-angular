import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieSchema } from '../../../models/movie-schema';
import { createSoapBody, createSoapEnvelope } from '../soap-util';
import { createMovieSchema } from '../movie-util';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private reloadTrigger = new BehaviorSubject<void>(undefined);
    reloadListOfMovies$ = this.reloadTrigger.asObservable();

    triggerReloadListOfMovies() {
        this.reloadTrigger.next();
    }

    private apiUrlMovieService = '/api-curser/MovieSoapService';
    private apiUrlClientService = '/api-curser/ClientSoapService';
    private headers = new HttpHeaders({
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: '',
    });

    constructor(private http: HttpClient) {}
    listAllMovies(): Observable<MovieSchema[]> {
        return this.http
            .post(this.apiUrlMovieService, createSoapEnvelope('listAll'), {
                headers: this.headers,
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

        return this.http.post(this.apiUrlMovieService, createSoapEnvelope('createMovie', body), {
            headers: this.headers,
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

        return this.http.post(this.apiUrlMovieService, createSoapEnvelope('updateMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }

    deleteMovie(id: number): Observable<string> {

        const body = `
            <arg0> ${id} </arg0>
        `;

        return this.http.post(this.apiUrlMovieService, createSoapEnvelope('deleteMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }

    rentMovie(idClient: number, idMovie: number): Observable<string> {

        const body = `
            <arg0> ${idClient} </arg0>
            <arg1> ${idMovie} </arg1>
        `;

        const soapEnvelop = createSoapEnvelope('rentMovie', body)

        return this.http.post(this.apiUrlClientService,soapEnvelop , {
            headers: this.headers,
            responseType: 'text',
        });
    }

    returnMovie(idClient: number, idMovie: number): Observable<string> {

        const body = `
            <arg0> ${idClient} </arg0>
            <arg1> ${idMovie} </arg1>
        `;

        return this.http.post(this.apiUrlClientService, createSoapEnvelope('returnMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }
}
