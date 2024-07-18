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
  
  
  public pageSize: number = 1; // Cantidad de elementos por página (una card por página)
  public currentPage: number = 1; // Página actual
  constructor(private pedidoServiceMesa: PedidosDeMesaService) { }

  ngOnInit(): void {
    //Observable para los pedidos
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
  }
  eliminarPedido(IdPedido:any){
   this.pedidoServiceMesa.setIdPedido(IdPedido); 
}

get pagedPedidos(): any[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.PedidosParaMostrar.slice(startIndex, startIndex + this.pageSize);
}

get pageCount(): number {
  return Math.ceil(this.PedidosParaMostrar.length / this.pageSize);
}

get pagesArray(): number[] {
  return Array(this.pageCount).fill(0).map((x, i) => i + 1);
}

setPage(page: number) {
  if (page >= 1 && page <= this.pageCount) {
    this.currentPage = page;
  }
}

nextPage() {
  if (this.currentPage < this.pageCount) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}
}