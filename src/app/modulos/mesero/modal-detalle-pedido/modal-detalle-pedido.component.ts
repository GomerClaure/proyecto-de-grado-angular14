import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';


@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrls: ['./modal-detalle-pedido.component.scss']
})
export class ModalDetallePedidoComponent implements OnInit {
  descripcion: string = '';
  constructor(private descripcionPedidoService:DescripcionPedidoService,private toastr:ToastrService) { }

  ngOnInit(): void {
        
  } 
  agregarDescripcion() {
    const isDescriptionAdded = this.descripcionPedidoService.addDescripcion(this.descripcion)
    console.log(this.descripcion);
    if (isDescriptionAdded) {
      this.toastr.success('Se agrego la descripcion','Exito');
    } else {
      // Si no se pudo agregar la descripción, puedes mostrar un mensaje de error o hacer cualquier otra acción necesaria
      this.toastr.info('No hay descripcion para agregar','Informacion');
    }
    this.descripcion = ''; 
    isDescriptionAdded==false;
  }
} 
