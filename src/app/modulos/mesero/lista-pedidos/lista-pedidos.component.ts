import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosMesa } from 'src/app/modelos/PedidosMesa';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';

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
  mesa:number=0;

  id_restaurante:any;
  id_empleado:any;

  constructor(private pedidoService: PedidoService,private pedidoServiceMesa:PedidosDeMesaService,private cuentaService:CuentaService) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.id_empleado= parseInt(sessionStorage.getItem('id_empleado')||'0');
    this.obtenerPedidos();
  } 
  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_empleado,this.id_restaurante).subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        console.log("Obteniendo pedidos",this.pedidos);
        this.agruparPedidosPorMesa();
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }
  agruparPedidosPorMesa(): void {
    // Primero, inicializamos el array de pedidos agrupados por mesa
    this.pedidosPorMesa = [];

    // Creamos un mapa para rastrear las mesas ya agregadas
    const mesasMap = new Map<string, { nombreMesa: string, estadoP: string, pedidos: any[], idCuenta: number }>();

    this.pedidos.forEach(pedido => {
        const nombreMesa = pedido.cuenta.mesa.nombre;
        const est = pedido.estado.nombre;
        const idCuenta = pedido.cuenta.id;

        // Verificamos si la cuenta está cerrada o pagada
        if ( pedido.cuenta.estado === 'Pagada'|| pedido.cuenta.estado === 'Cancelada') {
            return;
        }

        // Verificamos si la mesa ya está en el mapa
        if (!mesasMap.has(nombreMesa)) {
            // Si no está en el mapa, la agregamos
            mesasMap.set(nombreMesa, {
                nombreMesa: nombreMesa,
                estadoP: est,
                pedidos: [pedido],
                idCuenta: idCuenta
            });
        } else {
            // Si ya está en el mapa, agregamos el pedido a la lista de pedidos de esa mesa
            mesasMap.get(nombreMesa)?.pedidos.push(pedido);
        }
    });

    // Convertimos el mapa a un array y lo asignamos a `pedidosPorMesa`
    this.pedidosPorMesa = Array.from(mesasMap.values());
}
  mostrar(nombreMesa: string,estado:string) {
    const pedidosMesa = this.pedidosPorMesa.find(item => item.nombreMesa === nombreMesa)?.pedidos || [];
    this.pedidoServiceMesa.setPedidosDeMesa(pedidosMesa,nombreMesa,estado);
    console.log(pedidosMesa)
  }
  IdCuenta(id:number){
    this.cuentaService.saveId(id);
    console.log('este es el id',id);
  }
}
