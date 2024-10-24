import { Component, OnInit } from '@angular/core';
import { ModalEliminarPlatilloService } from 'src/app/services/modales/modal-eliminar-platillo.service';
import { PlatillosService } from '../../../../services/platillos/platillos.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent {
  showModal = false;
  nombre: string = '';
  private nombreSubscription: Subscription | undefined;


  constructor(private modalService: ModalEliminarPlatilloService,
              private platillosService: PlatillosService,
              private toastr:ToastrService) {
  }
  ngOnInit() {
    this.nombreSubscription = this.modalService.getNombrePlatillo$().subscribe(nombre => {
      this.nombre = nombre;
      console.log('Nombre del platillo en modal:', this.nombre);
    });
  }

  eliminarPlatillo() {
    console.log("Platillo eliminado" + this.modalService.idPlatilloModal())
    this.platillosService.deletePlatillo(this.modalService.idPlatilloModal()).subscribe(
      res => {
        console.log(this.modalService.listaPlatillos());
        this.modalService.listaPlatillos()
          .splice(this.modalService.listaPlatillos()
            .findIndex(platillo => platillo.id === this.modalService.idPlatilloModal()), 1);
        console.log(res);
        this.toastr.success('Platillo eliminado','Exito');
      },
      err => {
        console.log(err);
        this.toastr.error('El platillo no se pudo eliminar','Error');
      }
    );

  }
  ngOnDestroy() {
    if (this.nombreSubscription) {
      this.nombreSubscription.unsubscribe();
    }
  }

}
