import { Component, Input } from '@angular/core';
import { ListMoviesComponent } from '../../components/list-movies-component/list-movies-component';
import { UserSchema } from '../../../models/user-schema';

@Component({
  selector: 'app-client-page',
  imports: [ListMoviesComponent],
  templateUrl: './client-page.html',
  styleUrl: './client-page.css'
})
export class ClientPage {
  @Input() isLogged:boolean = false;
  @Input() isAdmin: boolean= false

  @Input() user: UserSchema | null = null;
}
