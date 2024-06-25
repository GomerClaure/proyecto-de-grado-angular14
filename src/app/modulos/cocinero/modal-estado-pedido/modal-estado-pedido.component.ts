import { Component, OnInit } from '@angular/core';
import { PlatilloCocina } from 'src/app/modelos/Platillo';
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
  platillosDescripcion:any[]=[];
  platillosSinDescripcion:any[]=[];
  platillosAmostrar:PlatilloCocina[]=[];


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
    this.pedidoCocina.tipoPedido$.subscribe((tipoP)=>{
       this.tipo=tipoP;
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
    this.mostrar(this.platillosDescripcion,'ConDescripcion');
    this.mostrar(this.platillosSinDescripcion,'SinDescripcion');
 }
  mostrar(lista:any,iden:string){
    if(iden=='ConDescripcion'){
      lista.forEach((list:any)=>{
         list.forEach((li:any)=>{
           let nom=li.nombre;
           let cantidad=li.pivot.cantidad;
           let desc=li.pivot.detalle;
           let platillo: PlatilloCocina = { nombre: nom, cantidad: cantidad, detalle: desc };
           this.platillosAmostrar.push(platillo);
         })
      })
    }else if (iden === 'SinDescripcion') {
      let agrupados: { [key: string]: PlatilloCocina } = {};
  
      lista.forEach((list: any) => {
        list.forEach((li: any) => {
          let nom = li.nombre;
          let cant = li.pivot.cantidad;
  
          if (agrupados[nom]) {
            // Si ya existe el platillo con este nombre, sumar la cantidad
            agrupados[nom].cantidad += cant;
          } else {
            // Si no existe, crear un nuevo platillo sin descripción
            let platillo: PlatilloCocina = { nombre: nom, cantidad: cant, detalle: '' };
            agrupados[nom] = platillo;
          }
        });
      });
  
      // Convertir el objeto agrupados a un arreglo de platillos sin descripción
      this.platillosSinDescripcion = Object.values(agrupados);
  
      // Imprimir los platillos sin descripción
      this.platillosSinDescripcion.forEach(platillo => {
        console.log(platillo.nombre, platillo.cantidad, platillo.detalle);
      });
    }
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
