import { Component, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  pedidos: DetallePedido[] = [];
  pedidosPorMesa: any[] = [];
  errorMessage: string = '';
  id_restaurante: number = 0;
  id_empleado: number = 0;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
  }
  
  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_empleado, this.id_restaurante).subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        this.agruparPedidosPorMesa();
        console.log("Pedidos del cajero", this.pedidosPorMesa);
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }

  agruparPedidosPorMesa(): void {
    // Inicializamos el array de pedidos agrupados por mesa
    this.pedidosPorMesa = [];

    // Creamos un mapa para rastrear las mesas ya agregadas
    const mesasMap = new Map<string, { nombreMesa: string, estadoP: string, pedidos: DetallePedido[], idCuenta: number, razon_social: string, nit: number }>();

    this.pedidos.forEach(pedido => {
      const nombreMesa = pedido.cuenta.mesa.nombre;
      const estadoP = pedido.estado.nombre;
      const idCuenta = pedido.cuenta.id;
      const razon_social = pedido.nombre_razon_social;
      const nit = pedido.nit|| '00000000';

      // Verificamos si la cuenta está cerrada o pagada
      if (pedido.cuenta.estado === 'Pagada' || pedido.cuenta.estado === 'Cancelada') {
        return;
      }

      // Verificamos si la mesa ya está en el mapa
      if (!mesasMap.has(nombreMesa)) {
        // Si no está en el mapa, la agregamos
        mesasMap.set(nombreMesa, {
          nombreMesa: nombreMesa,
          estadoP: estadoP,
          pedidos: [pedido],
          idCuenta: idCuenta,
          razon_social: razon_social,
          nit: nit
        });
      } else {
        // Si ya está en el mapa, agregamos el pedido a la lista de pedidos de esa mesa
        mesasMap.get(nombreMesa)?.pedidos.push(pedido);
      }
    });

    // Convertimos el mapa a un array y lo asignamos a `pedidosPorMesa`
    this.pedidosPorMesa = Array.from(mesasMap.values());
  }
}
