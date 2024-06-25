import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-modal-estado-pedido',
  templateUrl: './modal-estado-pedido.component.html',
  styleUrls: ['./modal-estado-pedido.component.scss']
})
export class ModalEstadoPedidoComponent implements OnInit {

  platillo: any[] = [];
  idPlatillo: any = null;
  Estado: string = '';
  idRestaurante = 0;
  platillosDescripcion:any[]=[];
  platillosSinDescripcion:any[]=[];


  constructor(private pedidoCocina: PedidosCocinaService, private pedidoS:PedidoService) { }

  ngOnInit(): void {
    this.pedidoCocina.platillos$.subscribe((platos) => {
        this.platillo = platos;
        console.log( "los platillos",this.platillo);
        this.ordenarPlatillos();
      });
    this.pedidoCocina.estPedido$.subscribe((est)=>{
       this.Estado=est;
    });
    }

  ordenarPlatillos(){
    this.platillo.forEach((plato)=>{
      if(plato.descripcion !== ''){
        this.platillosDescripcion.push(plato);
      }
      else{
        this.platillosSinDescripcion.push(plato);
      }
    }); 
    console.log("con des",this.platillosDescripcion);
  }
  cambiarEstado(idEstado:any){
    let idPedido=this.pedidoCocina.getIdPedido();
    this.idRestaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    console.log(idPedido,this.idRestaurante,idEstado)
    this.pedidoS.cambiarEstadoPedido(idPedido,this.idRestaurante.toString(),idEstado).subscribe((res)=>{
      console.log(res)
      });
  }
}
