import { Component } from '@angular/core';
import { UserSchema } from '../../../models/user-schema';
import { FormsModule } from '@angular/forms';
import { UseService } from '../../services/user-service/use-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

 constructor(private userService: UseService, private router: Router,){}

   isLogged = false
   isAdmin = false
  protected username = ""
  protected password = ""
  protected error = ""

  requestLogin(username: string, password: string){
    this.userService.login(username, password).subscribe({
      next: (resp:UserSchema) => {
        if(resp){
            console.log('usuario logado');
            this.userService.setUser(resp);
            this.router.navigate(['user']);
        }

      },
      error: (err) => {
        console.error('Erro ao tentar se logar', err);
        this.error = "login ou senha invalido"
      },
    });

  }
}
