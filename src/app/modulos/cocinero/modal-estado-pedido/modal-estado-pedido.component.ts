import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-modal-estado-pedido',
  templateUrl: './modal-estado-pedido.component.html',
  styleUrls: ['./modal-estado-pedido.component.scss']
})
export class ModalEstadoPedidoComponent implements OnInit {

  platillo: any[] = [];
  idPlatillo: any = null;
  idRestaurante = 0;

  constructor(private pedidoCocina: PedidosCocinaService, private pedidoS:PedidoService) { }

  ngOnInit(): void {
    this.pedidoCocina.platillos$.subscribe((platos) => {
        this.platillo = platos;
      });
      this.pedidoCocina.idPlatillo$.subscribe((id) => {
        this.idPlatillo = id;
      });
  }
  cambiarEstado(idEstado:any){
    let idPedido=this.pedidoCocina.getIdPedido();
    this.idRestaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    const formData = new FormData();
    formData.append('idEstado', idEstado);
    formData.append('idPedido',idPedido.toString());
    formData.append('idRestaurante',this.idRestaurante.toString());

    this.pedidoS.cambiarEstadoPedido(formData);
  }
}
