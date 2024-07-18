import { Component, OnInit } from '@angular/core';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-modal-eliminar-pedido',
  templateUrl: './modal-eliminar-pedido.component.html',
  styleUrls: ['./modal-eliminar-pedido.component.scss']
})
export class ModalEliminarPedidoComponent implements OnInit {

  constructor( private pedidoService:PedidoService,private pedidoMesa:PedidosDeMesaService,private toast:NgToastService) { }
  IdPedido:number=0;
  ngOnInit(): void {
  }
  eliminarPedido(){
    this.IdPedido=this.pedidoMesa.getIdpedido();
    this.pedidoService.deletePedido(this.IdPedido).subscribe(
      response => {
        console.log('Pedido eliminado exitosamente:', response);
        this.toast.success({detail:"SUCCESS",summary:'Se elimino el pedido correctamente',duration:2000});
        // Aquí puedes agregar lógica adicional, como actualizar la lista de pedidos
      },
      error => {
        console.error('Error al eliminar el pedido:', error);
        this.toast.error({detail:"ERROR",summary:'No se puede eliminar el pedido ya fue entregado',sticky:true})
      }
    );
  }
  }

