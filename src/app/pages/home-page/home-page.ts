import { Component } from '@angular/core';
import { ListMoviesComponent } from '../../components/list-movies-component/list-movies-component';

@Component({
  selector: 'app-home-page',
  imports: [ListMoviesComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
