import { Component, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  pedidos: DetallePedido[] = [];
  errorMessage: string = '';
  id_restaurante: number;
  id_empleado:number;

  constructor(private pedidoService: PedidoService) { 
    
    this.id_restaurante = 0;
    this.id_empleado=0;
  }

  ngOnInit(): void {
    this.id_restaurante= +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    console.log(this.id_empleado)
    console.log(this.id_restaurante)
    this.obtenerPedidos();
    //Suscribirse a los cambios de los pedidos
  }
  
  obtenerPedidos(){
    this.pedidoService.getPedidos(this.id_empleado, this.id_restaurante).subscribe(
      (response) => {
        console.log("Pedidos del cajero",response);
        this.pedidos = response.pedidos;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }
}
