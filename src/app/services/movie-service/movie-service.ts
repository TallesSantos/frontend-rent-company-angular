import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieSchema } from '../../../models/movie-schema';
import { createSoapBody, createSoapEnvelope } from '../utils/soap-util';

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

    createMovieSchema(item: Element) {
        const el = item;
        const id = Number(el.querySelector(':scope > id')?.textContent);
        const name = String(el.querySelector(':scope> name')?.textContent);
        const description = String(el.querySelector(':scope > description')?.textContent);
        const rented = el.querySelector(':scope > rented')?.textContent;
        const rentedTime = String(el.querySelector(':scope > rentedTime')?.textContent);
        const image_url = String(el.querySelector(':scope > imageUrl')?.textContent);
        const clientId = Number(el.querySelector(':scope > client > id')?.textContent);
        const clientName = String(el.querySelector(':scope > client > name')?.textContent);

        const comments: CommentSchema[] = [];
        el.querySelectorAll(':scope > comments').forEach((element) => {
            const commentId = 1;
            const commentText = element.querySelector(':scope > commentText')?.textContent;

            const commentLikes: string[] = [];

            element.querySelectorAll(':scope > nameOfLikers').forEach((element) => {
                commentLikes.push(element.textContent);
            });

            const commentsChildren: CommentSchema[] = [];
            element.querySelectorAll(':scope > childresnComments').forEach((element) => {
                console.log('children', element);
                const commentChildrenId = 2;
                const commentChidrenText =
                    element.querySelector(':scope > commentText')?.textContent;

                const commentChildrenLikes: string[] = [];
                element.querySelectorAll(':scope > nameOfLikers').forEach((like) => {
                    console.log(like.textContent);
                    commentChildrenLikes.push(like.textContent);
                });

                commentsChildren.push({
                    id: commentChildrenId,
                    commentText: commentChidrenText!,
                    nameOfLikers: commentChildrenLikes,
                });
            });

            const comment: CommentSchema = {
                id: commentId,
                commentText: commentText!,
                nameOfLikers: commentLikes,
                children: commentsChildren,
            };
            comments.push(comment);
            console.log(element);
        });

        const nameOfLikers: string[] = [];
        el.querySelectorAll(':scope > nameOfLikers').forEach((element) => {
            nameOfLikers.push(element.textContent);
        });
        const movie: MovieSchema = {
            id,
            name,
            description,
            is_rent: rented?.match('true') ? true : false,
            rent_date: rentedTime,
            client: clientId && clientName ? { id: clientId, name: clientName } : null,
            image_url: image_url,
            nameOfLikers: nameOfLikers,
        };
        return movie;
    }

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
                        const movie: MovieSchema = this.createMovieSchema(items[i]);
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

    createMovie(name: string, description: string): Observable<string> {
        const body = createSoapBody([
            {
                properties: [
                    { propertyName: 'name', propertyValue: name },
                    { propertyName: 'description', propertyValue: description },
                ],
            },
        ]);

        return this.http.post(this.apiUrlMovieService, createSoapEnvelope('createMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }

    editMovie(id: number, request: MovieSchema): Observable<string> {
        const body = createSoapBody([
            {
                properties: [
                    { propertyName: 'id', propertyValue: id },
                    {
                        propertyName: request.name ? 'name' : null,
                        propertyValue: request.name ? request.name : null,
                    },
                    {
                        propertyName: request.description ? 'description' : null,
                        propertyValue: request.description ? request.description : null,
                    },
                ],
            },
        ]);

        console.log(body);

        return this.http.post(this.apiUrlMovieService, createSoapEnvelope('updateMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }

    deleteMovie(id: number): Observable<string> {
        const body = `
            <arg0>${id}</arg0>
          `;

        return this.http.post(this.apiUrlMovieService, createSoapEnvelope('deleteMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }

    rentMovie(idClient: number, idMovie: number): Observable<string> {
        const body = `
            <arg0>${idClient}</arg0>
            <arg1>${idMovie}</arg1>
          `;

        return this.http.post(this.apiUrlClientService, createSoapEnvelope('rentMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }

    returnMovie(idClient: number, idMovie: number): Observable<string> {
        const body = `
            <arg0>${idClient}</arg0>
            <arg1>${idMovie}</arg1>
          `;

        return this.http.post(this.apiUrlClientService, createSoapEnvelope('returnMovie', body), {
            headers: this.headers,
            responseType: 'text',
        });
    }
}
