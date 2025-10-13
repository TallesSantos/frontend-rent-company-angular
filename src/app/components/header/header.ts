import { Component, HostBinding, Input } from '@angular/core';
import { UseService } from '../../services/user-service/use-service';
import { Router, RouterLink } from '@angular/router';
import { UserSchema } from '../../../models/user-schema';

@Component({
    selector: 'div[app-header]',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrls: ['../../styles/global.css', './header.css'],
})
export class Header {
    constructor(private userService: UseService, private router: Router) {}
    @Input() className = '';

    @HostBinding('class')
    get hostClasses() {
        return this.className;
    }

    getUser(): UserSchema | null {
        return this.userService.getUser();
    }

    requestLogoff() {
        this.userService.setUser(null);
        this.router.navigate(['']);
    }
}
