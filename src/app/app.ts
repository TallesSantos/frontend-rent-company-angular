import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UseService } from './services/user-service/use-service';
import { UserSchema } from '../models/user-schema';
import { Header } from './components/header/header';
import { ModalComponent } from './components/modal-component/modal-component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, Header, ModalComponent],
    templateUrl: './app.html',
    styleUrls: ['styles/global.css', './app.css'],
})
export class App  {
    constructor(private userService: UseService) {}
    protected user!: UserSchema | null;

}
