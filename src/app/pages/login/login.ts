import { ModalService } from './../../services/modal-service/modal-service';

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { UserSchema } from '../../../models/user-schema';
import { FormsModule } from '@angular/forms';
import { UseService } from '../../services/user-service/use-service';
import { Router } from '@angular/router';
import { SignInRequestSchema } from '../../../models/request/sign-up-request-schema';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    @ViewChild('modalContent') modalContent!: TemplateRef<any>;
    signInClient: SignInRequestSchema = {
        fullName: '',
        nickName: '',
        email: '',
        documentNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'CLIENT',
    };

    constructor(
        private userService: UseService,
        private router: Router,
        private modalService: ModalService
    ) {}

    isLogged = false;
    isAdmin = false;
    protected username = '';
    protected password = '';
    protected errorMessage = '';
    protected errorModalMessage = {
        message: '',
        errors: [],
    };
    protected successMessage = '';

    requestLogin(username: string, password: string) {
        this.userService.login(username, password).subscribe({
            next: (resp: UserSchema) => {
                if (resp) {
                    this.userService.setUser(resp);
                    this.router.navigate(['user']);
                }
            },
            error: (err) => {
                console.error('Erro ao tentar se logar', err);
                this.errorMessage = 'login ou senha invalido';
            },
        });
    }

    openModalSignUp() {
        this.errorModalMessage.message = '';
        this.errorModalMessage.errors = [];
        this.modalService.open(this.modalContent);
    }

    requestSignUp(event: Event) {
        event.preventDefault();
        this.userService.signUp(this.signInClient).subscribe({
            next: (resp: UserSchema) => {
                if (resp) {
                    this.userService.setUser(resp);
                    if (resp?.userType == 'CLIENT') {
                        this.router.navigate(['user/all-movies']);
                    } else {
                        this.router.navigate(['user/manage-movies']);
                    }
                }
                this.router;
                this.modalService.close();
            },
            error: (err) => {
                console.error('Erro ao tentar se cadastrar', err);
                this.errorModalMessage.errors = Object.values(err.error.errors);
            },
        });
    }
}
