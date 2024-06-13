import { Component, OnInit } from '@angular/core';
import { PedidosCocina } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.scss']
})
export class MostrarPedidosComponent implements OnInit {
  pedidos: any[] = [];
  errorMessage: string = '';
  pedidosMostrar:PedidosCocina[]=[];
  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }
  obtenerPedidos(): void {
    this.pedidoService.getPedidos().subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        this.ordenarPedidos();
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }
  ordenarPedidos(){
    this.pedidos.forEach(pedido=>{
      const numeroPedido=pedido.id;
      const tipo=pedido.tipo;
      const mesaP=pedido.cuenta.mesa.nombre;
      const platosP=pedido.platos;
      const horaP=pedido.fecha_hora_pedido;
      this.pedidosMostrar.push({numPedido:numeroPedido,mesa:mesaP,platos:[platosP],tipoPedido:tipo,hora:horaP})
    })
    this.pedidosMostrar.sort((a, b) => {
      const dateA = new Date(b.hora);
      const dateB = new Date(a.hora);
      return dateB.getTime() - dateA.getTime();
    });
  }
  }
