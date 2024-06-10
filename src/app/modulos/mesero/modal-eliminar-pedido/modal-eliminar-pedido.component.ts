import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-modal-eliminar-pedido',
  templateUrl: './modal-eliminar-pedido.component.html',
  styleUrls: ['./modal-eliminar-pedido.component.scss']
})
export class ModalEliminarPedidoComponent implements OnInit {

  constructor( private pedidoService:PedidoService,private pedidoMesa:PedidosDeMesaService) { }
  IdPedido:number=0;
  ngOnInit(): void {
  }
  eliminarPedido(){
    this.IdPedido=this.pedidoMesa.getIdpedido();
    this.pedidoService.deletePedido(this.IdPedido).subscribe(
      response => {
        console.log('Pedido eliminado exitosamente:', response);
        // Aquí puedes agregar lógica adicional, como actualizar la lista de pedidos
      },
      error => {
        console.error('Error al eliminar el pedido:', error);
      }
    );
  }
  }

