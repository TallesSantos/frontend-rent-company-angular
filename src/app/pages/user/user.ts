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
export class User implements OnInit {
    protected user: UserSchema | null = null;

    constructor(private userService: UseService, private router: Router) {}
    ngOnInit(): void {
        this.userService.user$
            .pipe(() => this.userService.getUserOfToken())
            .subscribe({
                next: (user: UserSchema) => {
                    this.user = user;
                },
                error: (err: any) => {
                    this.user = null;
                    console.error('Erro ao carregar usuario:', err);
                },
            });
    }

    getUser() {
        return this.userService.getUser();
    }
}
