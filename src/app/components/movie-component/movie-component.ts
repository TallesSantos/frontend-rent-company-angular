import { Component, Input, input } from '@angular/core';

import { MovieSchema } from '../../../models/movie-schema';
import { Movie } from '../../services/movie';
import { FormsModule } from '@angular/forms';
import { UserSchema } from '../../../models/user-schema';

@Component({
  selector: 'app-movie-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css',
})
export class MovieComponent {
  constructor(private movieService: Movie) {}

  @Input() isLogged!: boolean;

  @Input() isAdmin!: boolean;

  @Input() movie!: MovieSchema;

  @Input() user: UserSchema | null =null;

  public id!: number;
  public name = '';
  public description = '';


  updateMovie(id: number, name: string, description: string) {
    const movie = { id: id, name: name, description: description };
    this.movieService.editMovie(id, movie).subscribe({
      next: () => {
        console.log('Filme atualizado com sucesso');
      },
      error: (err) => {
        console.error('Erro ao atualizar filme:', err);
      },
    });

    console.log(id);
    console.log(name);
    console.log(description);
  }
  removeMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        console.log('Filme deletado com sucesso');
      },
      error: (err) => {
        console.error('Erro ao deletar o filme:', err);
      },
    });
    console.log(id);
  }

  rentMovie(userId:number, movieId:number){
    this.movieService.rentMovie(userId, movieId).subscribe({
      next: () => {
        console.log('Filme alugado com sucesso');
      },
      error: (err) => {
        console.error('Erro ao alugar o filme:', err);
      },
    });

  }

   returnMovie(userId:number, movieId:number){
  this.movieService.returnMovie(userId, movieId).subscribe({
      next: () => {
        console.log('Filme devolvido com sucesso');
      },
      error: (err) => {
        console.error('Erro ao devolver o filme:', err);
      },
    });
  }
}
