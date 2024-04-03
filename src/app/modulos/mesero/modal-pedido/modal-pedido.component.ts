import { Component, OnInit } from '@angular/core';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';
@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss']
})
export class ModalPedidoComponent implements OnInit {
  descripcion: string = '';

  constructor(private sharedDataService:DescripcionPedidoService ) { }

  ngOnInit(): void {
  } 

  agregarDescripcion() {
    this.sharedDataService.setDescripcion(this.descripcion);
    console.log('Descripción guardada:', this.descripcion);
    // Aquí puedes hacer lo que quieras con la descripción, como enviarla a un servidor o guardarla localmente
    // Por ejemplo, puedes llamar a un método del servicio que se encargue de guardar la descripción
    // Luego, puedes cerrar el modal aquí si es necesario
  }
}
