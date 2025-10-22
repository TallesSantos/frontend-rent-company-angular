import { LocalStorageService } from './services/local-storage-service/local-storage-service';
import { Component, OnInit,  } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UseService } from './services/user-service/use-service';

import { Header } from './components/header/header';
import { ModalComponent } from './components/modal-component/modal-component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, Header, ModalComponent],
    templateUrl: './app.html',
    styleUrls: ['styles/global.css', './app.css'],
})
export class App implements OnInit {
    constructor(
        private userService: UseService,
        private localStorageService: LocalStorageService,
        private router: Router
    ) {}
    ngOnInit(): void {
        try {
            const token = this.userService.getToken();
            if (token) {
                this.userService.setUserFromBackend(token);
            }
        } catch (e) {
            this.localStorageService.removeOfLocalStorage('token');
            this.router.navigate(['/']);
        }
    }

}
