import { Router } from '@angular/router';
import { UserSchema } from '../../../../models/user-schema';
import { UseService } from './../../../services/user-service/use-service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from '../../../services/modal-service/modal-service';
import { AddressRequest, PhoneRequest } from '../../../../models/request/user-profile-request';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-profile',
    imports: [FormsModule],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
    @ViewChild('modalAddAddress') modalAddAddress!: TemplateRef<any>;
    @ViewChild('modalUpdateAddress') modalUpdateAddress!: TemplateRef<any>;
    @ViewChild('modalAddPhone') modalAddPhone!: TemplateRef<any>;
    @ViewChild('modalUpdatePhone') modalUpdatePhone!: TemplateRef<any>;

    protected addAddressRequest: Omit<AddressRequest, 'id'> = {
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        number: '',
        comment: '',
    };

    protected updateAddressRequest: AddressRequest = {
        id: 0,
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        number: '',
        comment: '',
    };

    protected addAPhoneRequest: Omit<PhoneRequest, 'id'> = {
        phoneNumber: '',
    };

    protected updatePhoneRequest: PhoneRequest = {
        id: 0,
        phoneNumber: '',
    };

    constructor(
        protected userService: UseService,
        private router: Router,
        private modalService: ModalService
    ) {}
    ngOnInit(): void {
        this.userService.user$
            .pipe(() => this.userService.getUserOfToken())
            .subscribe({
                next: (user: UserSchema) => {
                    this.userService.setUser(user);
                    console.log('user', this.userService.getUser())
                },
                error: (err: any) => {
                    console.error('Erro ao carregar filmes:', err);
                },
            });
    }

    openModalAddAddress() {
        this.modalService.open(this.modalAddAddress);
    }

    openModalUpdateAddress() {
        this.modalService.open(this.modalUpdateAddress);
    }

    openModalAddPhone() {
        this.modalService.open(this.modalAddPhone);
    }

    openModalUpdatePhone() {
        this.modalService.open(this.modalUpdatePhone);
    }

    requestAddAddress(event: Event) {
        event.preventDefault();
        this.userService.addAddress(this.addAddressRequest).subscribe({
            next: () => {
                console.log('adicionado com sucesso');
                console.log(this.userService.getUser());
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar se adicionar');
            },
        });
    }

    requestUpdateAddress(event: Event, id: number) {
        event.preventDefault();
        this.userService.updateAddress(this.updateAddressRequest).subscribe({
            next: () => {
                console.log('adicionado com sucesso');
                console.log(this.userService.getUser());
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar se adicionar');
            },
        });
    }


    requestRemoveAddress(id:number ){

        this.userService.removeAddress(id).subscribe({
            next: () => {
                console.log('removido com sucesso');
                console.log(this.userService.getUser());
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar remover');
            },
        });
    }
    requestUpdatePhone(event: Event ){
        event.preventDefault();
        this.userService.updatePhone(this.updatePhoneRequest).subscribe({
            next: () => {
                console.log('adicionado com sucesso');
                console.log(this.userService.getUser());
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar se atualizar');
            },
        });
    }

     requestAddPhone(event: Event) {
        event.preventDefault();
        this.userService.addPhone(this.addAPhoneRequest).subscribe({
            next: () => {
                console.log('autualizado com sucesso');
                console.log(this.userService.getUser());
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar atualizar');
            },
        });
    }

    requestRemovePhone(id: number){
          this.userService.removePhone(id).subscribe({
            next: () => {
                console.log('removido com sucesso');
                console.log(this.userService.getUser());
                this.modalService.close();
            },
            error: () => {
                console.error('Erro ao tentar se remover');
            },
        });
    }
}
