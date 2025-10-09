import { FormsModule } from '@angular/forms';
import { MovieService } from './../../../../services/movie-service/movie-service';
import { Component } from '@angular/core';
import { ListMoviesComponent } from '../../../../components/list-movies-component/list-movies-component';

@Component({
    selector: 'app-manage-movies',
    imports: [FormsModule, ListMoviesComponent],
    templateUrl: './manage-movies.html',
    styleUrl: './manage-movies.css',
})
export class ManageMovies {
    constructor(private movieService: MovieService) {}

    protected name: string = "";
    protected description: string = "";
    createMovie(name: string, description: string) {
        this.movieService.createMovie(name, description).subscribe({
            next: () => {
                console.log('Filme criado com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao criar o filme:', err);
            },
        });
    }
}
