import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public model: string;
  public id: string;
  public hide: string = 'hide';
  public notifacation = new EventEmitter<any>();

  constructor() { }

  hideModal() {
    this.hide = 'hide';
    this.id = null;
    this.model = null;
  }

  showModal(model: string, id: string) {
    this.id = id;
    this.model = model;
    this.hide = '';
  }
}
