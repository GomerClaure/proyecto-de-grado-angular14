import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-modal-eliminar-pedido',
  templateUrl: './modal-eliminar-pedido.component.html',
  styleUrls: ['./modal-eliminar-pedido.component.scss']
})
export class ModalEliminarPedidoComponent implements OnInit {
  public idRestaurante: number;
  public idPedido:number;
  constructor( private pedidoService:PedidoService,private pedidoMesa:PedidosDeMesaService,private toastr:ToastrService) { 
    this.idRestaurante = 0;
    this.idPedido = 0;
  }
  
  
  ngOnInit(): void {
    this.idRestaurante = +sessionStorage.getItem('id_restaurante')!;
  }
  eliminarPedido(){
    this.idPedido=this.pedidoMesa.getIdpedido();
    
    this.pedidoService.deletePedido(this.idPedido, this.idRestaurante).subscribe(
      response => {
        console.log('Pedido eliminado exitosamente:', response);
        this.toastr.success('Se elimino el pedido correctamente','Exito');
        // Aquí puedes agregar lógica adicional, como actualizar la lista de pedidos
      },
      error => {
        console.error('Error al eliminar el pedido:', error);
        this.toastr.error('No se puede eliminar el pedido ya fue entregado','Error')
      }
    );
  }
  }

