import { Component, OnInit } from '@angular/core';
import { ModalEliminarPlatilloService } from 'src/app/services/modales/modal-eliminar-platillo.service';
import { PlatillosService } from '../../../../services/platillos/platillos.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent {
  showModal = false;

  constructor(private modalService: ModalEliminarPlatilloService,
     private platillosService: PlatillosService) {

  }
  eliminarPlatillo() {
    console.log("Platillo eliminado" + this.modalService.idPlatilloModal());
    this.platillosService.deletePlatillo(this.modalService.idPlatilloModal()).subscribe(
      res => {
        console.log(this.modalService.listaPlatillos());
        this.modalService.listaPlatillos()
          .splice(this.modalService.listaPlatillos()
            .findIndex(platillo => platillo.id === this.modalService.idPlatilloModal()), 1);
        alert("Platillo eliminado corredtamente.");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

  }


}
