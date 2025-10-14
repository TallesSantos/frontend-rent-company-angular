import { CommonModule } from '@angular/common';
import { ModalService } from './../../services/modal-service/modal-service';
import { Component } from '@angular/core';


@Component({
  selector: 'div[app-modal-component]',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './modal-component.html',
  styleUrls: ['./modal-component.css']
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}

  close() {
    this.modalService.close();
  }
}
