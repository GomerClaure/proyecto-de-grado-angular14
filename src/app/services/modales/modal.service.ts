import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalStatus = new Subject<boolean>();
  private modalAction = new Subject<string>();
  private idPlatillo: number = 0;

  constructor() { }

  idPlatilloModal() {
    return this.idPlatillo;
  }
  getModalStatus() {
    return this.modalStatus.asObservable();
  }

  getModalAction() {
    return this.modalAction.asObservable();
  }

  openModal(id: number) {
    this.idPlatillo = id;
    this.modalStatus.next(true);
  }

  closeModal(action: string) {
    this.modalStatus.next(false);
    this.modalAction.next(action);
  }
}