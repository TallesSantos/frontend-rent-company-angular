import { Component } from '@angular/core';
import { UseService } from '../../../services/user-service/use-service';

@Component({
  selector: 'app-homepage-user',
  imports: [],
  templateUrl: './homepage-user.html',
  styleUrl: './homepage-user.css'
})
export class HomepageUser {
    constructor(protected userService: UseService){}

    printUser(){
        console.log(this.userService.getUser())
    }
}
