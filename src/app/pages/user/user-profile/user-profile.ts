import { Router } from '@angular/router';
import { UserSchema } from '../../../../models/user-schema';
import { UseService } from './../../../services/user-service/use-service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from '../../../services/modal-service/modal-service';
import { AddAddressRequest } from '../../../../models/request/AddAddressRequest';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-profile',
    imports: [FormsModule],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
     @ViewChild('modalContent') modalContent!: TemplateRef<any>;
    protected user!: UserSchema | null;

    protected addAddressRequest: AddAddressRequest ={
        country:"",

  state: "",

  city:"",

  streetAddress:"",

  number:"",

  comment:""
    }

    constructor(private userService: UseService, private router: Router, private modalService: ModalService) {}
    ngOnInit(): void {
        const user = this.userService.getUser();
        if (!user) {
            this.router.navigate(['/login']);
        } else {
            this.user = this.userService.getUser();
        }

    }

      openModalSignUp() {

        this.modalService.open(this.modalContent);
    }

    requestAddAddress(event: Event) {
         event.preventDefault();
        this.userService.addAddress(this.addAddressRequest).subscribe({
            next: () => {

                console.log("adicionado com sucesso")
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar se adicionar');
            },
        })
    }
}
