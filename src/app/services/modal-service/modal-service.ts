import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this._isOpen.asObservable();

  private _content = new BehaviorSubject<TemplateRef<any> | null>(null);
  content$ = this._content.asObservable();

  open(content: TemplateRef<any>) {
    this._content.next(content);
    this._isOpen.next(true);
    document.body.style.overflow = 'hidden'; // bloqueia o scroll da página
  }

  close() {
    this._isOpen.next(false);
    this._content.next(null);
    document.body.style.overflow = 'auto';
  }
}
