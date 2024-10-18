import { Component, OnInit } from '@angular/core';
import { ModalEliminarPlatilloService } from 'src/app/services/modales/modal-eliminar-platillo.service';
import { PlatillosService } from '../../../../services/platillos/platillos.service';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';

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
    private toast:NgToastService) {
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
        this.toast.success({ detail:'Platillo eliminado', summary: 'Success', duration: 1000});
      },
      err => {
        console.log(err);
        this.toast.error({detail:"ERROR",summary:'El platillo no se pudo eliminar',sticky:true});
      }
    );

  }
  ngOnDestroy() {
    // Limpia la suscripción para evitar fugas de memoria
    if (this.nombreSubscription) {
      this.nombreSubscription.unsubscribe();
    }
  }

}
