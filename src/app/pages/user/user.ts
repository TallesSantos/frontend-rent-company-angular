import { Component, OnInit } from '@angular/core';
import { UseService } from '../../services/user-service/use-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserSchema } from '../../../models/user-schema';

@Component({
    selector: 'app-user',
    imports: [RouterOutlet],
    templateUrl: './user.html',
    styleUrl: './user.css',
})
export class User  {


    constructor(private userService: UseService, private router: Router) {}


    getUser() {
        return this.userService.getUser();
    }
}
