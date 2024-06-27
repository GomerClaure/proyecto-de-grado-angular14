import { Component, OnInit } from '@angular/core';
import { PedidosPlatos } from 'src/app/modelos/PedidosMesa';
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
  tipo: string = '';
  idRestaurante = 0;
  
  PlatosMostrar:PedidosPlatos[]=[];
  
  constructor(private pedidoCocina: PedidosCocinaService, private pedidoS:PedidoService) { }

  ngOnInit(): void {
    this.pedidoCocina.platillos$.subscribe((platillo) => {
      this.ordenar(platillo);
      });
    this.pedidoCocina.estPedido$.subscribe((est)=>{
       this.Estado=est;
    });
    this.pedidoCocina.tipoPedido$.subscribe((tipoP)=>{
       this.tipo=tipoP;
    });
    }

    ordenar(platillosP: any) {
      this.PlatosMostrar = [];
      const platosMap: { [key: string]: { nombre: string, cantidad: number, detalle: string | null } } = {};
  
      platillosP.forEach((platosP: any) => {
        platosP.forEach((elem: any) => {
          const nomb = elem.nombre;
          const cant = elem.pivot.cantidad;
          const det = elem.pivot.detalle || null;
  
          if (det === null) {
            if (platosMap[nomb]) {
              platosMap[nomb].cantidad += cant;
            } else {
              platosMap[nomb] = { nombre: nomb, cantidad: cant, detalle: det };
            }
          } else {
            this.PlatosMostrar.push({ nombre: nomb, cantidad: cant, detalle: det as string });
          } 
        });
      });
      for (const key in platosMap) {
        this.PlatosMostrar.push(platosMap[key] as PedidosPlatos);
      }
  
      console.log("mmmm", this.PlatosMostrar);
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
