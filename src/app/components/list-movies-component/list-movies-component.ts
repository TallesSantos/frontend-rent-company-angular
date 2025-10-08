import { Component, Input } from '@angular/core';
import { MovieSchema } from '../../../models/movie-schema';
import { Movie } from '../../services/movie';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from '../movie-component/movie-component';
import { UserSchema } from '../../../models/user-schema';

@Component({
  selector: 'app-list-movies-component',
  standalone:true,
  imports: [FormsModule, MovieComponent],
  templateUrl: './list-movies-component.html',
  styleUrl: './list-movies-component.css'
})
export class ListMoviesComponent {
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

  @Input() isLogged:boolean = false;
  @Input() isAdmin:boolean = false;

  @Input() user: UserSchema | null = null;

  printMovies(){
    console.log(this.movies)
  }
}
