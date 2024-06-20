import { Component, OnInit } from '@angular/core';
import { PedidosCocina } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.scss']
})
export class MostrarPedidosComponent implements OnInit {
  pedidos: any[] = [];
  errorMessage: string = '';
  pedidosP:PedidosCocina[]=[];
  pedidosMostrar:PedidosCocina[]=[];
  pedidosParaLlevar:PedidosCocina[]=[];
  pedidosParaAqui:PedidosCocina[]=[];
  pedidosPreparacion:PedidosCocina[]=[];
  pedidosTerminado:PedidosCocina[]=[];
  platillos:any[]=[];

  constructor(private pedidoService: PedidoService,private pedidoCocina:PedidosCocinaService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }
  obtenerPedidos(): void {
    this.pedidoService.getPedidos().subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        console.log(this.pedidos);
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
      console.log(this.pedidos,"aquiiii")
      const numeroPedido=pedido.id;
      const tipo=pedido.tipo;
      const mesaP=pedido.cuenta.mesa.nombre;
      const platosP=pedido.platos;
      const horaP=pedido.fecha_hora_pedido;
      const estadoP=pedido.estado.nombre;
      this.pedidosP.push({numPedido:numeroPedido,mesa:mesaP,platos:[platosP],tipoPedido:tipo,hora:horaP,estado:estadoP})
    })
    this.pedidosP.sort((a, b) => {
      const dateA = new Date(b.hora);
      const dateB = new Date(a.hora);
      return dateB.getTime() - dateA.getTime();
    });
    this.mostrarped(this.pedidosP);
  }
  MostrarTodos(){
    this.pedidosMostrar=this.pedidosP;
  }
  paraLlevar(): void {
    this.pedidosParaLlevar = this.pedidosP.filter(ped => ped.tipoPedido === 'llevar');
    this.mostrarped(this.pedidosParaLlevar);
  }
  paraAqui():void{
    this.pedidosParaAqui = this.pedidosP.filter(ped => ped.tipoPedido === 'local');
    this.mostrarped(this.pedidosParaAqui)
  }
  mostrarped(p:any){
    this.pedidosMostrar=p;
  }
  verPlatos(id:number){
    const IdPedido=id;
    const pedido = this.pedidosP.find(p => p.numPedido === id);
    this.platillos = pedido ? pedido.platos : [];
    this.pedidoCocina.setPlatillos(this.platillos);
    this.pedidoCocina.setIdPedido(IdPedido);
    }
  enPreparacion(){
    this.pedidosPreparacion= this.pedidosP.filter(p=>p.estado=='En preparación');
    this.mostrarped(this.pedidosPreparacion);
  }
  terminado(){
   this.pedidosTerminado=this.pedidosP.filter(pe=>pe.estado=='Servido');
   this.mostrarped(this.pedidosTerminado);
  }
}
