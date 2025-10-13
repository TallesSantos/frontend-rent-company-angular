import { Component, Input } from '@angular/core';
import { MovieSchema } from '../../../models/movie-schema';
import { MovieService as MovieService } from '../../services/movie-service/movie-service';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from '../movie-component/movie-component';
import { UserSchema } from '../../../models/user-schema';
import { switchMap } from 'rxjs';
import { UseService } from '../../services/user-service/use-service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-list-movies-component',
    standalone: true,
    imports: [FormsModule, MovieComponent,CommonModule],
    templateUrl: './list-movies-component.html',
    styleUrl: './list-movies-component.css',
})
export class ListMoviesComponent {
    movies: MovieSchema[] = [];

    constructor(private movieService: MovieService, private userService:UseService) {}

    ngOnInit(): void {
        this.movieService.reloadListOfMovies$.pipe(switchMap(() => this.movieService.listAllMovies())).subscribe({
            next: (movies: MovieSchema[]) => {
                this.movies = movies;
            },
            error: (err: any) => {
                console.error('Erro ao carregar filmes:', err);
            },
        });
    }
}
