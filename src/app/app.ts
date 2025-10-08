import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminPage } from './pages/admin-page/admin-page';
import { HomePage } from './pages/home-page/home-page';
import { ClientPage } from './pages/client-page/client-page';
import { UserSchema } from '../models/user-schema';
import { FormsModule } from '@angular/forms';
import { ListMoviesComponent } from './components/list-movies-component/list-movies-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,HomePage, AdminPage, ClientPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected user: UserSchema | null = null;
   isLogged = false
   isAdmin = false
  protected username = ""
  protected password = ""

  requestLogin(username: string, password: string){
    if(username === 'root' && password === '123'){
      this.isLogged = true;
      this.isAdmin = true;
      this.user = {id:1, name:username }
    }
    if(username === 'normal-user' && password === '123'){
      this.isLogged = true;
      this.user = {id:1, name:username }
    }

  }

  requestLogoff(){
      this.isLogged = false
      this.isAdmin = false
      this.username = ""
      this.password = ""
      this.user = null
      }

}
