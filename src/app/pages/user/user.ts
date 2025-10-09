import { Component, OnInit } from '@angular/core';
import { UseService } from '../../services/user-service/use-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserSchema } from '../../../models/user-schema';

@Component({
    selector: 'app-user',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './user.html',
    styleUrl: './user.css',
})
export class User implements OnInit {
    protected user: UserSchema | null = null;

    constructor(private userService: UseService, private router: Router) {}

    ngOnInit(): void {
        this.user = this.userService.getUser();
    }

    getUser() {
        return this.userService.getUser();
    }

    requestLogoff() {
        this.userService.setUser(null);
        this.router.navigate(['']);
    }
}
