import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';


@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrls: ['./modal-detalle-pedido.component.scss']
})
export class ModalDetallePedidoComponent implements OnInit {
  descripcion: string = '';
  constructor(private descripcionPedidoService:DescripcionPedidoService,private toast:NgToastService) { }

  ngOnInit(): void {
        
  } 
  agregarDescripcion() {
    const isDescriptionAdded = this.descripcionPedidoService.addDescripcion(this.descripcion)
    if (isDescriptionAdded) {
      this.toast.success({detail:"SUCCESS",summary:'Se agrego la descripcion',duration:2000});
    } else {
      // Si no se pudo agregar la descripción, puedes mostrar un mensaje de error o hacer cualquier otra acción necesaria
      console.error('Error al agregar la descripción del platillo');
    }
    this.descripcion = ''; 
    isDescriptionAdded==false;
  }
} 
