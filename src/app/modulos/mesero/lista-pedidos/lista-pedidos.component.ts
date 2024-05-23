import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosMesa } from 'src/app/modelos/PedidosMesa';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: any[] = [];
  errorMessage: string = '';
  pedidosPorMesa: PedidosMesa[] = []; // Utiliza la interfaz PedidosMesa como tipo para el array

  constructor(private pedidoService: PedidoService) { }

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
      const numeroMesa = pedido.cuenta.id_mesa;
      const nombreMesa = pedido.cuenta.mesa.nombre; // Obtén el nombre de la mesa
      const pedidosMesa = this.pedidosPorMesa.find(item => item.nombreMesa === nombreMesa); // Busca si ya existe la mesa en el array

      if (!pedidosMesa) { // Si la mesa no existe, la agregamos al array con sus pedidos
        this.pedidosPorMesa.push({ nombreMesa: nombreMesa, pedidos: [pedido] });
      } else { // Si la mesa ya existe, agregamos el pedido al array de pedidos de esa mesa
        pedidosMesa.pedidos.push(pedido);
      }
    });
    console.log(this.pedidosPorMesa);
  }
}
