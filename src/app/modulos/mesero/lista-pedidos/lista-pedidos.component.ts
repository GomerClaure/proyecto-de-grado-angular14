import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosMesa } from 'src/app/modelos/PedidosMesa';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: any[] = [];
  pedidosMostrar:any[]=[];
  errorMessage: string = '';
  pedidosPorMesa: PedidosMesa[] = []; 

  constructor(private pedidoService: PedidoService,private pedidoServiceMesa:PedidosDeMesaService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  } 
  
  obtenerPedidos(): void {
    this.pedidoService.getPedidos().subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        this.agruparPedidosPorMesa();
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }
  agruparPedidosPorMesa(): void {
    this.pedidos.forEach(pedido => {
      const nombreMesa = pedido.cuenta.mesa.nombre;
      const est=pedido.estado.nombre;
      console.log(est);
      const pedidosMesa = this.pedidosPorMesa.find(item => item.nombreMesa === nombreMesa); 

      if (!pedidosMesa) { 
        this.pedidosPorMesa.push({ nombreMesa: nombreMesa,estadoP:est, pedidos: [pedido]});
      } else { 
        pedidosMesa.pedidos.push(pedido); 
      }
    });
  } 
  mostrar(nombreMesa: string,estado:string) {
    const pedidosMesa = this.pedidosPorMesa.find(item => item.nombreMesa === nombreMesa)?.pedidos || [];
    this.pedidoServiceMesa.setPedidosDeMesa(pedidosMesa,nombreMesa,estado);
  }
}
