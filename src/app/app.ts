import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movie } from './services/movie';
import { MovieSchema } from '../models/movie-schema';
import { ClientSchema } from '../models/client-schema';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('frontend-curser');


  movies: MovieSchema[] = [];

  ngOnInit(): void {
    this.movieService.listAllMovies().subscribe({
      next: (movies:MovieSchema[]) => {
        this.movies = movies;

      },
      error: (err:any) => {
        console.error('Erro ao carregar filmes:', err);
      },
    });
  }


  constructor(private movieService: Movie) {}

  printMovies(){
    console.log(this.movies)
  }

}
