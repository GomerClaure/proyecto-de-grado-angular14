import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modales/modal.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent{ 
  showModal = false;

  constructor(private modalService: ModalService) {
    this.modalService.getModalStatus().subscribe(status => {
      this.showModal = status;
    });
    this.modalService.getModalAction().subscribe(action => {
      if (action === 'save') {
        console.log('Se presionó "Save changes"');
      } else if (action === 'close') {
        console.log('Se presionó "Close"');
      }
    });
   }
  eliminarPlatillo(){
    console.log("Platillo eliminado"+this.modalService.idPlatilloModal());
  }


}
