import { Component, OnInit } from '@angular/core';
import { DetallePedido, DetallePedidoCajero } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  pedidos: DetallePedido[] = [];
  pedi:DetallePedidoCajero[]=[];
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
        this.pedi = this.pedidos.map(pedido => ({
          cuenta: pedido.cuenta,
          estado: pedido.estado,
          monto: pedido.monto,
          platos: pedido.platos,
          tipo: pedido.tipo,
          updatedAt: pedido.updatedAt,
          id: pedido.id,
          id_estado: pedido.id_estado,
          id_cuenta: pedido.id_cuenta,
          id_empleado: pedido.id_empleado,
          fecha_hora_pedido: pedido.fecha_hora_pedido
        }));
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
    const mesasMap = new Map<string, { 
      nombreMesa: string, 
      estadoP: string, 
      pedidos: DetallePedidoCajero[], 
      idCuenta: number, 
      razon_social: string, 
      nit: number 
    }>();
  
    this.pedi.forEach(pedido => {
      const nombreMesa = pedido.cuenta.mesa.nombre;
      const estadoP = pedido.estado.nombre;
      const idCuenta = pedido.cuenta.id;
      const razon_social = pedido.cuenta.nombre_razon_social;
      const nit = pedido.cuenta.nit ? Number(pedido.cuenta.nit) : 0;
      if (pedido.cuenta.estado === 'Pagada' || pedido.cuenta.estado === 'Cancelada') {
        return;
      }
      if (!mesasMap.has(nombreMesa)) {
        mesasMap.set(nombreMesa, {
          nombreMesa: nombreMesa,
          estadoP: estadoP,
          pedidos: [pedido],
          idCuenta: idCuenta,
          razon_social: razon_social || 'Anonimo',
          nit: nit
        });
      } else {
        mesasMap.get(nombreMesa)?.pedidos.push(pedido);
      }
    });
    this.pedidosPorMesa = Array.from(mesasMap.values());
  }
 
}

