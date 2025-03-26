import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PedidosCocina, PedidosPlatos } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-mostrar-detalle-pedidos',
  templateUrl: './mostrar-detalle-pedidos.component.html',
  styleUrls: ['./mostrar-detalle-pedidos.component.scss']
})
export class MostrarDetallePedidosComponent implements OnInit, OnChanges {

  @Input() pedidosP: PedidosCocina[] = [];
  @Input() id_restaurante = 0;
  @Input() id_empleado = 0;
  @Input() id_pedido_detallado = 0;

  indicePedidoActual = 0;
  maximoMiniaturasVisibles = 5;
  pedidoSeleccionado!: PedidosCocina;
  platosMostrar: PedidosPlatos[] = [];
  touchStartX = 0;
  touchEndX = 0;
  minSwipeDistance = 50;

  constructor(private pedidoService: PedidoService, private pedidoCocinaService: PedidosCocinaService) {}

  ngOnChanges(): void {
    if (this.pedidosP.length > 0) {
      this.pedidoSeleccionado = this.pedidosP.find(p => p.id === this.id_pedido_detallado) || this.pedidosP[0];
      this.indicePedidoActual = this.pedidosP.indexOf(this.pedidoSeleccionado);
      this.ordenarPlatos(this.pedidoSeleccionado.platos);
    }
  }

  ngOnInit(): void {
    this.seleccionarPedido(this.id_pedido_detallado);
    this.pedidoCocinaService.pedidoDetallado$.subscribe(id => this.seleccionarPedido(id));
    window.addEventListener('keydown', this.detectarFlechas.bind(this));
  }

  ordenarPlatos(platillos: any[]): void {
    const platosMap = new Map<string, PedidosPlatos>();
    this.platosMostrar = [];

    platillos.forEach(({ nombre, pivot }: any) => {
      if (!pivot.detalle) {
        platosMap.has(nombre)
          ? platosMap.get(nombre)!.cantidad += pivot.cantidad
          : platosMap.set(nombre, { nombre, cantidad: pivot.cantidad, detalle: '' });
      } else {
        this.platosMostrar.push({ nombre, cantidad: pivot.cantidad, detalle: pivot.detalle });
      }
    });

    this.platosMostrar.push(...Array.from(platosMap.values()));
  }

  cambiarEstado(idEstado: string): void {
    if (this.pedidoSeleccionado.estado !== 'Terminado') {
      this.pedidoService.cambiarEstadoPedido(this.pedidoSeleccionado.id.toString(), this.id_restaurante.toString(), idEstado)
        .subscribe(res => console.log(res));
    }
  }

  get pedidosVisibles(): PedidosCocina[] {
    const total = this.pedidosP.length;
    if (total <= this.maximoMiniaturasVisibles) return this.pedidosP;
    
    const inicio = (this.indicePedidoActual - Math.floor(this.maximoMiniaturasVisibles / 2) + total) % total;
    const fin = (inicio + this.maximoMiniaturasVisibles) % total;
    
    return fin <= inicio ? [...this.pedidosP.slice(inicio), ...this.pedidosP.slice(0, fin)] : this.pedidosP.slice(inicio, fin);
  }

  seleccionarPedido(idPedido: number): void {
    const nuevoIndice = this.pedidosP.findIndex(p => p.id === idPedido);
    if (nuevoIndice === -1) return console.error('Pedido no encontrado en la lista.');
    
    this.indicePedidoActual = nuevoIndice;
    this.pedidoSeleccionado = this.pedidosP[nuevoIndice];
    this.id_pedido_detallado = idPedido;
    this.ordenarPlatos(this.pedidoSeleccionado.platos);
  }

  cambiarPedido(direccion: number, scroll: boolean = false): void {
    console.log('Se llama  a cambiar pedido');
    this.indicePedidoActual = (this.indicePedidoActual + direccion + this.pedidosP.length) % this.pedidosP.length;
    this.pedidoSeleccionado = this.pedidosP[this.indicePedidoActual];
    this.id_pedido_detallado = this.pedidoSeleccionado.id;
    this.ordenarPlatos(this.pedidoSeleccionado.platos);
    this.pedidoCocinaService.actualizarPedidoDetallado(this.id_pedido_detallado);
    if (scroll){
      if (direccion === 1) this.desplazarIzquierda();
      else this.desplazarDerecha();
    }else{
      if (direccion === 1) this.desplazarDerecha();
      else this.desplazarIzquierda();
    }
  }

  detectarFlechas(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.cambiarPedido(1);
    else if (event.key === 'ArrowLeft') this.cambiarPedido(-1);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    if (Math.abs(this.touchEndX - this.touchStartX) > this.minSwipeDistance) {
      console.log('sera raro pero no deberia entrar aqui');
      this.cambiarPedido(this.touchEndX > this.touchStartX ? -1 : 1, true);
    }
  }

  toggleAnimacion(clase: string) {
    const detallesPedido = document.querySelector('.detalles-pedido') as HTMLElement;
    detallesPedido.classList.remove('entrando-desde-derecha', 'saliendo-hacia-derecha', 'entrando-desde-izquierda', 'saliendo-hacia-izquierda');
    detallesPedido.classList.add(clase);
  }

  desplazarDerecha(){
    this.toggleAnimacion('saliendo-hacia-izquierda');
    setTimeout(() => {
      this.toggleAnimacion('entrando-desde-derecha');
    }, 200); // Duración de la transición
  }

  desplazarIzquierda(){
    this.toggleAnimacion('saliendo-hacia-derecha');
    setTimeout(() => {
      this.toggleAnimacion('entrando-desde-izquierda');
    }, 200); // Duración de la transición
  }
}
//pedido es el id_pedido_detallado