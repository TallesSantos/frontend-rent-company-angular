import { AuthService } from './../../services/auth-service/auth-service';
import { ModalService } from './../../services/modal-service/modal-service';

import { Component, TemplateRef, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UseService } from '../../services/user-service/use-service';
import { Router } from '@angular/router';
import { SignInRequestSchema } from '../../../models/request/sign-up-request-schema';
import { AuthResponse } from '../../../models/response/auth-response';
import { UserSchema } from '../../../models/user-schema';

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

    constructor(
        private authService: AuthService,
        private userService: UseService,
        private router: Router,
        private modalService: ModalService

    ) {}

    requestLogin(username: string, password: string) {
        this.authService.login(username, password).subscribe({
            next: (resp: AuthResponse) => {
                if (resp) {
                    this.userService.setToken(resp.token);
                    this.userService.getUserOfToken().subscribe({
                        next: (resp: UserSchema) => {
                            this.userService.setUser(resp);
                        },
                        error: (err) => {
                              console.error('Erro ao tentar buscar usuario', err);
                        },
                    });

                    console.log(resp);
                    this.userService.setUser(null);
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
        this.authService.signUp(this.signInClient).subscribe({
            next: (resp: AuthResponse) => {
                if (resp) {
                    this.userService.setToken(resp.token);
                    this.userService.setUser(null);
                    /*
                    if (resp?.userType == 'CLIENT') {
                        this.router.navigate(['user/all-movies']);
                    } else {
                        this.router.navigate(['user/manage-movies']);
                    }
                }
                this.router;
                */
                }
                this.modalService.close();
            },
            error: (err) => {
                console.error('Erro ao tentar se cadastrar', err);
                this.errorModalMessage.errors = Object.values(err.error.errors);
            },
        });
    }
}
