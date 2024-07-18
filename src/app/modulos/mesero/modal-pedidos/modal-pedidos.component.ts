import { Component, OnInit } from '@angular/core';
import { PedidosParaMostrarMesa } from 'src/app/modelos/PedidosMesa';
import { PedidosDeMesaService } from 'src/app/services/pedido/pedidos-de-mesa.service';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.component.html',
  styleUrls: ['./modal-pedidos.component.scss']
})
export class ModalPedidosComponent implements OnInit {
  pedidosDeMesa: any[] = [];
  nombreMesa:string='';
  estadoPedido:string='';
  PedidosParaMostrar: { pedidoId: number, platos: PedidosParaMostrarMesa[], totalPedido: number,estado:string}[] = [];
  constructor(private pedidoServiceMesa: PedidosDeMesaService) { }

  ngOnInit(): void {
    this.pedidoServiceMesa.pedidosMesa$.subscribe(data => {
      this.estadoPedido=data.est;
      this.pedidosDeMesa = data.pedidos;
      this.nombreMesa = data.nombreMesa;
      this.ordenar();
    });
  }
  ordenar() {
    this.PedidosParaMostrar = this.pedidosDeMesa.map(pedido => {
      const cantidadesPorPlatillo: { [nombrePlatillo: string]: PedidosParaMostrarMesa } = {};
      let totalPedido = 0;

      pedido.platos.forEach((plato: any) => {
        const nombrePlatillo = plato.nombre;
        const cantidad = plato.pivot.cantidad;
        const precio = plato.precio;

        if (cantidadesPorPlatillo.hasOwnProperty(nombrePlatillo)) {
          cantidadesPorPlatillo[nombrePlatillo].cantidad += cantidad;
          cantidadesPorPlatillo[nombrePlatillo].totalPedido += cantidad * precio;
        } else {
          cantidadesPorPlatillo[nombrePlatillo] = {
            cantidad: cantidad,
            nomplatillo: nombrePlatillo,
            totalPedido: cantidad * precio
          };
        }

        totalPedido += cantidad * precio;
      });

      return {
        pedidoId: pedido.id,
        platos: Object.values(cantidadesPorPlatillo),
        totalPedido: totalPedido,
        estado: pedido.estado.nombre
      };
    });

    console.log("para mostrar",this.PedidosParaMostrar);
  }

}