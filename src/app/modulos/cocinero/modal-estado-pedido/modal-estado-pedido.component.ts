import { Component, OnInit } from '@angular/core';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-modal-estado-pedido',
  templateUrl: './modal-estado-pedido.component.html',
  styleUrls: ['./modal-estado-pedido.component.scss']
})
export class ModalEstadoPedidoComponent implements OnInit {

  platillo: any[] = [];
  constructor(private pedidoCocina: PedidosCocinaService) { }

  ngOnInit(): void {
    this.pedidoCocina.platillos$.subscribe((platos) => {
        this.platillo = platos;
      });
    }

}
