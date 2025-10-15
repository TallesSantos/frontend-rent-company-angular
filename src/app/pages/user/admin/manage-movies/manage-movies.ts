import { ModalService } from './../../../../services/modal-service/modal-service';
import { FormsModule } from '@angular/forms';
import { MovieService } from './../../../../services/movie-service/movie-service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ListMoviesComponent } from '../../../../components/list-movies-component/list-movies-component';

@Component({
    selector: 'app-manage-movies',
    imports: [FormsModule, ListMoviesComponent],
    templateUrl: './manage-movies.html',
    styleUrl: './manage-movies.css',
})
export class ManageMovies {
    @ViewChild('modalContent') modalContent!: TemplateRef<any>;

    constructor(private movieService: MovieService, private modalService: ModalService) {}

    protected AddMovieData = {
        name: '',
        description: '',
        imageUrl: '',
    };
    createMovie(name: string, description: string, imageUrl: string) {
        this.movieService.createMovie(name, description, imageUrl).subscribe({
            next: () => {
                console.log('Filme criado com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao criar o filme:', err);
            },
        });
    }

    openModalAddMovie() {
        this.modalService.open(this.modalContent);
    }

    requestAddMovie(event: Event) {
        event.preventDefault();
        this.movieService.createMovie(this.AddMovieData.name, this.AddMovieData.description,this.AddMovieData.imageUrl).subscribe({
            next: () => {
                console.log('Filme criado com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao criar o filme:', err);
            },
        });

        this.modalService.close();
    }
}
