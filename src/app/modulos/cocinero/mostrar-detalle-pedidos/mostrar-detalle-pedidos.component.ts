import { Component, Input, OnInit , OnChanges} from '@angular/core';
import { DetallePedido, PedidosCocina, PedidosPlatos } from 'src/app/modelos/PedidosMesa';

@Component({
  selector: 'app-mostrar-detalle-pedidos',
  templateUrl: './mostrar-detalle-pedidos.component.html',
  styleUrls: ['./mostrar-detalle-pedidos.component.scss']
})
export class MostrarDetallePedidosComponent implements OnInit,  OnChanges{

  // @Input() pedidos: DetallePedido[] = [];
  @Input() pedidosP: PedidosCocina[] = [];
  // @Input() platillos: any[] = [];

  @Input() id_restaurante: number;
  @Input() id_empleado: number;
  @Input() id_pedido_detallado: number;

  indicePedidoActual = 0; // Índice del pedido actualmente visible
  maximoMiniaturasVisibles = 5;
  pedidoSeleccionado: PedidosCocina = this.pedidosP[0];
  platosMostrar:PedidosPlatos[]=[];

  constructor() {
    console.log(this.pedidosP);
    this.id_restaurante = 1;
    this.id_empleado = 1;
    this.id_pedido_detallado = 0;
  }

  ngOnChanges(): void {
    if(this.pedidosP.length > 0){
      console.log(this.pedidosP);
      if (this.id_pedido_detallado == 0 && this.pedidosP.length > 0) {
        this.pedidoSeleccionado = this.pedidosP[0];
        this.id_pedido_detallado = this.pedidosP[0].id;
      }
      else
        this.pedidoSeleccionado = this.pedidosP.find(pedido => pedido.id == this.id_pedido_detallado)|| this.pedidosP[0];
      this.ordenar(this.pedidoSeleccionado.platos);}
  }

  ngOnInit(): void {
  }

  ordenar(platillosP: any) {
    this.platosMostrar = [];
    const platosMap: { [key: string]: { nombre: string, cantidad: number, detalle: string | null } } = {};

    platillosP.forEach((platosP: any) => {
      // platosP.forEach((elem: any) => {
        const nomb = platosP.nombre;
        const cant = platosP.pivot.cantidad;
        const det = platosP.pivot.detalle || null;

        if (det === null) {
          if (platosMap[nomb]) {
            platosMap[nomb].cantidad += cant;
          } else {
            platosMap[nomb] = { nombre: nomb, cantidad: cant, detalle: det };
          }
        } else {
          this.platosMostrar.push({ nombre: nomb, cantidad: cant, detalle: det as string });
        } 
      // });
    });

    for (const key in platosMap) {
      this.platosMostrar.push(platosMap[key] as PedidosPlatos);
    }
  }
  
  

  get pedidosVisibles() {
    const totalPedidos = this.pedidosP.length;
    const mitadVisible = Math.floor(this.maximoMiniaturasVisibles / 2);
    
    let inicio = (this.indicePedidoActual - mitadVisible + totalPedidos) % totalPedidos;
    let fin = (inicio + this.maximoMiniaturasVisibles) % totalPedidos;

    if (totalPedidos <= this.maximoMiniaturasVisibles) {
      return this.pedidosP;
    }

    if (fin <= inicio) {
      return this.pedidosP.slice(inicio).concat(this.pedidosP.slice(0, fin));
    }

    return this.pedidosP.slice(inicio, fin);
  }

  seleccionarPedido(idPedido: any) {
    console.log(idPedido);
    this.pedidoSeleccionado = idPedido;
    this.indicePedidoActual = this.pedidosP.indexOf(idPedido);
  }

  mostrarPedidoAnterior() {
    this.indicePedidoActual = (this.indicePedidoActual - 1 + this.pedidosP.length) % this.pedidosP.length;
    this.pedidoSeleccionado = this.pedidosP[this.indicePedidoActual];
    this.ordenar(this.pedidoSeleccionado.platos);
  }

  mostrarPedidoSiguiente() {
    this.indicePedidoActual = (this.indicePedidoActual + 1) % this.pedidosP.length;
    this.pedidoSeleccionado = this.pedidosP[this.indicePedidoActual];
    this.ordenar(this.pedidoSeleccionado.platos);
  }
}
//pedido es el id_pedido_detallado