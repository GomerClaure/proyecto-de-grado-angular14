import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosMesa, PedidosPorMesa } from 'src/app/modelos/PedidosMesa';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  pedidosMostrar:PedidosPorMesa[]=[];
  errorMessage: string = '';
  pedidosPorMesa: PedidosPorMesa[] = []; 
  mesa:number=0;
 
  id_restaurante:any;
  id_empleado:any;

  constructor(private pedidoService: PedidoService,
              private pedidoServiceMesa:PedidosDeMesaService,
              private cocinaService : PedidosCocinaService,
              private cuentaService:CuentaService) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.id_empleado= parseInt(sessionStorage.getItem('id_empleado')||'0');
    this.obtenerPedidos();
    this.suscribirCambios();
  } 
  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_empleado,this.id_restaurante).subscribe(
      (response) => {
        this.pedidosPorMesa = response.pedidos;
        console.log("estooooo",this.pedidosPorMesa)
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }

  mostrar(mesa: string) {
    this.pedidosMostrar = [];
    this.pedidosMostrar = this.pedidosPorMesa.filter(pedido => pedido.nombreMesa === mesa);
    this.pedidoServiceMesa.setPedidosDeMesa(this.pedidosMostrar);
  }
  
  IdCuenta(id:number){
    this.cuentaService.saveId(id);
    console.log('este es el id',id);
  }

  suscribirCambios(){
    this.cocinaService.pedidos$.subscribe(update => {
      if (update) {
        const { evento, datos } = update;
        let idPedido = datos.idPedido;
        // Dependiendo del tipo de evento, maneja el pedido de manera diferente
        switch (evento) {
          case 'PedidoEnPreparacion':
            this.actualizarEstadoPedido(idPedido, 'En preparación');
            break;
          case 'PedidoServido':
            this.actualizarEstadoPedido(idPedido, 'Servido');
            break;
          default:
            console.warn(`Evento no manejado: ${evento}`);
        }
        
      }
    });
  }

  actualizarEstadoPedido(idPedido: number, nuevoEstado: string): void {
    for (let mesa of this.pedidosPorMesa) {
      for (let pedido of mesa.pedidos) {
        if (pedido.id_pedido === idPedido) {
          pedido.estado = nuevoEstado;
          console.log(`Pedido actualizado:`, pedido);
          return;
        }
      }
    }
    console.warn(`No se encontró el pedido con id ${idPedido}`);
  }
  
}
