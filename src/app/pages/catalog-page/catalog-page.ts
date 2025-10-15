import { Component } from '@angular/core';
import { ListMoviesComponent } from '../../components/list-movies-component/list-movies-component';
import { UseService } from '../../services/user-service/use-service';
import { UserSchema } from '../../../models/user-schema';

@Component({
  selector: 'div[app-catalog-page]',
  imports: [ListMoviesComponent],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css'
})
export class CatalogPage {

    protected user: UserSchema | null = null;
    constructor(private userService: UseService){}

    hasUser(){
        if(this.userService.getUser !== null){
            return true
        }
        return false
    }

}
