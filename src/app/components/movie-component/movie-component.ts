import { MovieSchema } from './../../../models/movie-schema';
import { Component, Input, input, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie-service/movie-service';
import { FormsModule } from '@angular/forms';
import { UserSchema } from '../../../models/user-schema';
import { UseService } from '../../services/user-service/use-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment-component/comment-component';

@Component({
    selector: 'app-movie-component',
    standalone: true,
    imports: [FormsModule, RouterLink, CommonModule, CommentComponent],
    templateUrl: './movie-component.html',
    styleUrls: ['./movie-component.css'],
})
export class MovieComponent implements OnInit {
    constructor(private movieService: MovieService, private userService: UseService) {}

    @Input() movie!: MovieSchema;

    @Input() user!: UserSchema | null;

    public id!: number;
    public name = '';
    public description = '';

    showComments = false;

    toggleComments() {
        this.showComments = !this.showComments;
    }

    ngOnInit(): void {
        this.user = this.userService.getUser();
    }

    fallbackUrl: string = 'images/image_movie_fallback.jpeg';

    fallback(event: Event) {
        const imgElement = event.target as HTMLImageElement;
        imgElement.src = this.fallbackUrl;
    }

    updateMovie(id: number, name: string, description: string) {
        const movie = { id: id, name: name, description: description };
        this.movieService.editMovie(id, movie).subscribe({
            next: () => {
                console.log('Filme atualizado com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao atualizar filme:', err);
            },
        });
    }
    removeMovie(id: number) {
        this.movieService.deleteMovie(id).subscribe({
            next: () => {
                console.log('Filme deletado com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao deletar o filme:', err);
            },
        });
    }

    rentMovie(movieId: number) {
        this.movieService.rentMovie(this.user?.client?.id!, movieId).subscribe({
            next: () => {
                console.log('Filme alugado com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao alugar o filme:', err);
            },
        });
    }

    returnMovie(movieId: number) {
        this.movieService.returnMovie(this.user?.client?.id!, movieId).subscribe({
            next: () => {
                console.log('Filme devolvido com sucesso');
                this.movieService.triggerReloadListOfMovies();
            },
            error: (err) => {
                console.error('Erro ao devolver o filme:', err);
            },
        });
    }

    userIsNotNull() {
        if (this.user !== null && this.user?.id !== undefined) {
            return true;
        }
        return false;
    }
    userIsAdmin() {
        if (this.userIsNotNull() && this.user?.userType === 'ADMIN') {
            return true;
        }
        return false;
    }

    userIsClient() {
        if (this.userIsNotNull() && this.user?.userType === 'CLIENT' && this.user.client?.id) {
            return true;
        }
        return false;
    }

    getClientId() {
        return this.user?.client?.id;
    }

    movieIsRented(movie: MovieSchema) {
        if (movie.is_rent) {
            return true;
        }
        return false;
    }
    movieRentedByCurrentUser(movie: MovieSchema) {
        if (movie.client) {
            return true;
        }
        return false;
    }
}
