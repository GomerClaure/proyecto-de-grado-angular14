import { Component, OnInit } from '@angular/core';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.component.html',
  styleUrls: ['./modal-pedidos.component.scss']
})
export class ModalPedidosComponent implements OnInit {
  pedidosDeMesa: any[] = [];
  nombreMesa:string='';

  constructor(private pedidoServiceMesa: PedidosDeMesaService) { }

  ngOnInit(): void {
    this.pedidoServiceMesa.pedidosMesa$.subscribe(data => {
      this.pedidosDeMesa = data.pedidos;
      this.nombreMesa = data.nombreMesa;
      console.log("Datos cargados:", this.pedidosDeMesa, "Mesa:", this.nombreMesa);
      this.Ordenar();
    });
  }
  Ordenar(){
    
  }
}
