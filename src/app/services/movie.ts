import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieSchema } from '../../models/movie-schema';
import { ClientSchema } from '../../models/client-schema';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  private apiUrl = '/api-curser/MovieSoapService';
  private headers = new HttpHeaders({
    'Content-Type': 'text/xml;charset=UTF-8',
    'SOAPAction': '',
  });

  private soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoints_soap.application/">
      <soapenv:Header/>
      <soapenv:Body>
        <end:listarTodos/>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  constructor(private http: HttpClient) {}

  listAllMovies(): Observable<MovieSchema[]> {
    return this.http.post(this.apiUrl, this.soapEnvelope, {
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
          const clientId =  Number(el.querySelector(':scope > client > id')?.textContent);
          const clientName = String(el.querySelector(':scope > client > name')?.textContent);
          movies.push({ id, name, description, client: clientId && clientName? {id:clientId, name: clientName}: null});
        }

        return movies;
      }),
      catchError((err) => {
        console.error('Erro na requisição SOAP:', err);
        throw err;
      })
    );
  }
}
