import { routes } from './../../../app.routes';
import { Router } from '@angular/router';
import { UserSchema } from '../../../../models/user-schema';
import { UseService } from './../../../services/user-service/use-service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile',
    imports: [],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
    protected user!: UserSchema | null;

    constructor(private userService: UseService, private router: Router) {}
    ngOnInit(): void {
        const user = this.userService.getUser();
        if (!user) {
            this.router.navigate(['/login']);
        } else {
            this.user = this.userService.getUser();
        }

    }
}
