import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieSchema } from '../../../models/movie-schema';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

   private reloadTrigger = new BehaviorSubject<void>(undefined);
   reloadListOfMovies$ = this.reloadTrigger.asObservable();

   triggerReloadListOfMovies() {
     this.reloadTrigger.next(); // todos que estiverem ouvindo vão reagir
   }

  private apiUrlMovieService = '/api-curser/MovieSoapService';
  private apiUrlClientService = '/api-curser/ClientSoapService';
  private headers = new HttpHeaders({
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': '',
  });


  constructor(private http: HttpClient) {}

   soapEnvelope(method:string,body:string = "" ){
    return`
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoints_soap.application/">
      <soapenv:Header/>
      <soapenv:Body>
        <end:${method}>
          ${body}
        </end:${method}>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
   }


  listAllMovies(): Observable<MovieSchema[]> {
    return this.http.post(this.apiUrlMovieService, this.soapEnvelope("listAll"), {
      headers: this.headers,
      responseType: 'text',
    }).pipe(
      map((response: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, 'application/xml');
        const items = xml.getElementsByTagName('return');
        const movies: MovieSchema[] = [];

        for (let i = 0; i < items.length; i++) {
          const el = items[i];
          const id = Number(el.querySelector(':scope > id')?.textContent);
          const name = String(el.querySelector(':scope> name')?.textContent);
          const description = String(el.querySelector(':scope > description')?.textContent);
          const rented = el.querySelector(':scope > rented')?.textContent;
          const rentedTime = String(el.querySelector(':scope > rentedTime')?.textContent);
          const image_url = String(el.querySelector(':scope > imageUrl')?.textContent);
          const clientId =  Number(el.querySelector(':scope > client > id')?.textContent);
          const clientName = String(el.querySelector(':scope > client > name')?.textContent);
          movies.push({ id,
             name,
             description,
             is_rent:rented?.match("true")?true:false,
             rent_date:rentedTime,
             client: clientId && clientName? {id:clientId, name: clientName}: null,
             image_url:image_url
         });
        }
        return movies;
      }),
      catchError((err) => {
        console.error('Erro na requisição SOAP:', err);
        throw err;
      })
    );
  }

  createMovie(name:string, description:string):Observable<string>{
       const body = `
        <arg0>
            ${name?`<name> ${name}</name>`:""}
            ${description?`<description> ${description}</description>`:""}
        </arg0>`

          return this.http.post(this.apiUrlMovieService, this.soapEnvelope("createMovie", body), {
          headers: this.headers,responseType: 'text'})

  }

  editMovie(id:number, request:MovieSchema):Observable<string>{
    const body = `
        <arg0>
            <id>${id}</id>
            ${request.name?`<name> ${request.name}</name>`:""}
            ${request.description?`<description> ${request.description}</description>`:""}
        </arg0>`

          return this.http.post(this.apiUrlMovieService, this.soapEnvelope("updateMovie", body), {
          headers: this.headers,responseType: 'text'})


    }

    deleteMovie(id:number): Observable<string>{
        const body = `
            <arg0>${id}</arg0>
          `

          return this.http.post(this.apiUrlMovieService, this.soapEnvelope("deleteMovie", body), {
          headers: this.headers, responseType: 'text'})

    }

     rentMovie(idClient:number, idMovie:number): Observable<string>{
        const body = `
            <arg0>${idClient}</arg0>
            <arg1>${idMovie}</arg1>
          `

          return this.http.post(this.apiUrlClientService, this.soapEnvelope("rentMovie", body), {
          headers: this.headers, responseType: 'text'})

    }

     returnMovie(idClient:number, idMovie:number): Observable<string>{
        const body = `
            <arg0>${idClient}</arg0>
            <arg1>${idMovie}</arg1>
          `

          return this.http.post(this.apiUrlClientService, this.soapEnvelope("returnMovie", body), {
          headers: this.headers, responseType: 'text'})

    }
}
