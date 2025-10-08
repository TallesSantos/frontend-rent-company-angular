import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListMoviesComponent } from '../../components/list-movies-component/list-movies-component';
import { Movie } from '../../services/movie';
import { MovieSchema } from '../../../models/movie-schema';

@Component({
  selector: 'app-admin-page',
  standalone:true,
  imports: [FormsModule, ListMoviesComponent],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css'
})
export class AdminPage {
  @Input() isLogged:boolean = false;
  @Input() isAdmin = false

  protected name = ""
  protected description = ""

  constructor(private movieService: Movie) {}

  createMovie(name:string, description:string){
    this.movieService.createMovie(name, description).subscribe({
      next: () => {
        console.log('Filme criado com sucesso');
      },
      error: (err) => {
        console.error('Erro ao criar o filme:', err);
      },
    });

  }

}
