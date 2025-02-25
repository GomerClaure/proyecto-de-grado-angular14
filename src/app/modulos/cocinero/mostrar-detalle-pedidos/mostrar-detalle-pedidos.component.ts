import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DetallePedido, PedidosCocina, PedidosPlatos } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-mostrar-detalle-pedidos',
  templateUrl: './mostrar-detalle-pedidos.component.html',
  styleUrls: ['./mostrar-detalle-pedidos.component.scss']
})
export class MostrarDetallePedidosComponent implements OnInit, OnChanges {

  // @Input() pedidos: DetallePedido[] = [];
  @Input() pedidosP: PedidosCocina[] = [];
  // @Input() platillos: any[] = [];

  @Input() id_restaurante: number;
  @Input() id_empleado: number;
  @Input() id_pedido_detallado: number;

  indicePedidoActual: number; // Índice del pedido actualmente visible
  maximoMiniaturasVisibles = 5;
  pedidoSeleccionado: PedidosCocina = this.pedidosP[0];
  platosMostrar: PedidosPlatos[] = [];

  constructor(private pedidoService: PedidoService, private pedidoCocinaService: PedidosCocinaService) {
    console.log(this.pedidosP);
    this.id_restaurante = 0;
    this.id_empleado = 0;
    this.id_pedido_detallado = 0;
    this.indicePedidoActual = 0;
  }

  ngOnChanges(): void {
    if (this.pedidosP.length > 0) {
      console.log(this.pedidosP);
      if (this.id_pedido_detallado == 0 && this.pedidosP.length > 0) {
        this.pedidoSeleccionado = this.pedidosP.find(pedido => pedido.id == this.indicePedidoActual) || this.pedidosP[0];
        this.indicePedidoActual = this.pedidosP.indexOf(this.pedidoSeleccionado);
        this.ordenar(this.pedidoSeleccionado.platos);
      }
      else
        console.log(this.id_pedido_detallado);
      this.seleccionarPedido(this.id_pedido_detallado);

    }
  }

  ngOnInit(): void {
    this.seleccionarPedido(this.id_pedido_detallado);
    this.pedidoCocinaService.pedidoDetallado$.subscribe(id => {
      this.id_pedido_detallado = id;
      this.seleccionarPedido(id);
    });

    // Detectar flechas izquierda y derecha para TV
    window.addEventListener('keydown', this.detectarFlechas.bind(this));
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

  cambiarEstado(idEstado: any) {
    if (this.pedidoSeleccionado.estado == 'Terminado') {
      console.log("Ya termino")
    } else {
      let idPedido = this.pedidoSeleccionado.id.toString();
      console.log(idPedido, this.id_restaurante, idEstado)
      this.pedidoService.cambiarEstadoPedido(idPedido, this.id_restaurante.toString(), idEstado).subscribe((res) => {
        console.log(res)
      });
    }
  }

  get pedidosVisibles() {
    const totalPedidos = this.pedidosP.length;
    const mitadVisible = Math.floor(this.maximoMiniaturasVisibles / 2);

    let inicio = (this.indicePedidoActual - mitadVisible + totalPedidos) % totalPedidos;
    let fin = (inicio + this.maximoMiniaturasVisibles) % totalPedidos;

    if (totalPedidos < this.maximoMiniaturasVisibles) {
      return this.pedidosP;
    }

    if (fin <= inicio) {
      return this.pedidosP.slice(inicio).concat(this.pedidosP.slice(0, fin));
    }

    return this.pedidosP.slice(inicio, fin);
  }

  seleccionarPedido(idPedido: number) {
    console.log(idPedido);

    // Encuentra el índice del nuevo pedido en el array
    const nuevoIndice = this.pedidosP.findIndex(pedido => pedido.id === idPedido);

    // Verifica si el índice encontrado es válido
    if (nuevoIndice === -1) {
      console.error('Pedido no encontrado en la lista.');
      return;
    }

    // Determina si el nuevo índice es mayor o menor que el índice actual
    if (nuevoIndice > this.indicePedidoActual) {
      this.toggleAnimacion('saliendo-hacia-izquierda');
      setTimeout(() => {
        this.toggleAnimacion('entrando-desde-derecha');
      }, 200);
    } else if (nuevoIndice < this.indicePedidoActual) {
      this.toggleAnimacion('saliendo-hacia-derecha');
      setTimeout(() => {
        this.toggleAnimacion('entrando-desde-izquierda');
      }, 200);
    }

    // Actualiza el pedido seleccionado y el índice actual
    this.pedidoSeleccionado = this.pedidosP[nuevoIndice];
    this.indicePedidoActual = nuevoIndice;
    this.id_pedido_detallado = idPedido;
    this.ordenar(this.pedidoSeleccionado.platos);
  }


  mostrarPedidoAnterior() {

    this.indicePedidoActual = (this.indicePedidoActual - 1 + this.pedidosP.length) % this.pedidosP.length;
    this.pedidoSeleccionado = this.pedidosP[this.indicePedidoActual];
    this.id_pedido_detallado = this.pedidoSeleccionado.id;
    this.ordenar(this.pedidoSeleccionado.platos);
    this.toggleAnimacion('saliendo-hacia-derecha');
    this.pedidoCocinaService.actualizarPedidoDetallado(this.id_pedido_detallado);
    setTimeout(() => {

      this.toggleAnimacion('entrando-desde-izquierda');
    }, 200); // Duración de la transición
  }

  mostrarPedidoSiguiente() {
    this.indicePedidoActual = (this.indicePedidoActual + 1) % this.pedidosP.length;
    this.pedidoSeleccionado = this.pedidosP[this.indicePedidoActual];
    this.id_pedido_detallado = this.pedidoSeleccionado.id;
    this.ordenar(this.pedidoSeleccionado.platos);
    this.pedidoCocinaService.actualizarPedidoDetallado(this.id_pedido_detallado);

    this.toggleAnimacion('saliendo-hacia-izquierda');
    setTimeout(() => {

      this.toggleAnimacion('entrando-desde-derecha');
    }, 200); // Duración de la transición
  }

  toggleAnimacion(clase: string) {
    const detallesPedido = document.querySelector('.detalles-pedido') as HTMLElement;
    detallesPedido.classList.remove('entrando-desde-derecha', 'saliendo-hacia-derecha', 'entrando-desde-izquierda', 'saliendo-hacia-izquierda');
    detallesPedido.classList.add(clase);
  }

  detectarFlechas(event: KeyboardEvent) {
    console.log('Presiona ')
    if (event.key === 'ArrowRight') {
      this.mostrarPedidoSiguiente();
    } else if (event.key === 'ArrowLeft') {
      this.mostrarPedidoAnterior();
    }
  }
}
//pedido es el id_pedido_detallado