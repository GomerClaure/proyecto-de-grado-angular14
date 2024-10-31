import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosMesa, PedidosPorMesa } from 'src/app/modelos/PedidosMesa';
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
  pedidosPorMesa: PedidosPorMesa[] = []; 
  mesa:number=0;
 
  id_restaurante:any;
  id_empleado:any;

  constructor(private pedidoService: PedidoService,
              private pedidoServiceMesa:PedidosDeMesaService,
              private cuentaService:CuentaService) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.id_empleado= parseInt(sessionStorage.getItem('id_empleado')||'0');
    this.obtenerPedidos();
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

  mostrar() {
    this.pedidoServiceMesa.setPedidosDeMesa(this.pedidosPorMesa);
  }
  IdCuenta(id:number){
    this.cuentaService.saveId(id);
    console.log('este es el id',id);
  }
}
