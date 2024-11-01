import { Component, OnInit } from '@angular/core';
import { PedidosPorMesa } from 'src/app/modelos/PedidosMesa';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.component.html',
  styleUrls: ['./modal-pedidos.component.scss']
})
export class ModalPedidosComponent implements OnInit {
  pedidosPorMesa: PedidosPorMesa[]  = []; 
  pagedPedidos: any[] = [];

  constructor(private pedidoServiceMesa: PedidosDeMesaService) { }

  ngOnInit(): void {
    // Suscribirse al observable para obtener los pedidos
    this.pedidoServiceMesa.pedidosPorMesa$.subscribe(data => {
      this.pedidosPorMesa = data;
      console.log("Pedidos por mesa:", this.pedidosPorMesa);// creo que 
    });
  }

}
