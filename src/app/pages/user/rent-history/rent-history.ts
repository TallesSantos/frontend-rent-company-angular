import { switchMap } from 'rxjs';
import { MovieSchema } from '../../../../models/movie-schema';
import { MovieComponent } from '../../../components/movie-component/movie-component';
import { UseService } from './../../../services/user-service/use-service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rent-history',
    imports: [MovieComponent],
    templateUrl: './rent-history.html',
    styleUrl: './rent-history.css',
})
export class RentHistory implements OnInit {
    protected rentHistory: MovieSchema[] = [];

    constructor(private userService: UseService) {}

    ngOnInit(): void {
        this.userService.reloadRentMovies$
            .pipe(switchMap(() => this.userService.listAllHistoryOfClient()))
            .subscribe({
                next: (movies: MovieSchema[]) => {
                    this.rentHistory = movies.map((m) => {
                        return {
                            ...m,
                            image_url: m.image_url !== undefined ? m?.image_url : m?.imageUrl,
                        };
                    });
                },
                error: (err: any) => {
                    console.error('Erro ao carregar filmes:', err);
                },
            });
    }

    getRentHistory() {
        return this.rentHistory;
    }
}
