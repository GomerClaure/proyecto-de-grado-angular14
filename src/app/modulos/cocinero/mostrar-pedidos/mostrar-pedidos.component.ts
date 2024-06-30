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

  id_restaurante:any;
  id_empleado:any;

  constructor(private pedidoService: PedidoService,private pedidoCocina:PedidosCocinaService) { }

  ngOnInit(): void {
    this.pedidoService.pedidos$.subscribe(pedidos => {
      this.actualizarPedidos(pedidos);
      this.ordenarPedidos();
    });
    this.obtenerPedidos();
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.id_empleado= parseInt(sessionStorage.getItem('id_empleado')||'0');
  }
  extractHour(datetime: string): string {
    return datetime.split(' ')[1].substring(0, 5); // Extrae '15:05' de '2024-06-19 15:05:52'
  }
  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_restaurante,this.id_empleado).subscribe(
      () => {
        console.log("no")
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
      const horaP=this.extractHour(pedido.fecha_hora_pedido);
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
  actualizarPedidos(nuevosPedidos: any[]) {
    nuevosPedidos.forEach(pedido => {
      // Buscar si el pedido ya existe en pedidosP
      const indice = this.pedidosP.findIndex(p => p.numPedido === pedido.id);
      if (indice !== -1) {
        // Si existe, actualizar los campos necesarios
        this.pedidosP[indice].mesa = pedido.cuenta.mesa.nombre;
        this.pedidosP[indice].platos = [pedido.platos];
        this.pedidosP[indice].tipoPedido = pedido.tipo;
        this.pedidosP[indice].hora = this.extractHour(pedido.fecha_hora_pedido);
        this.pedidosP[indice].estado = pedido.estado.nombre;
      } else {
        // Si no existe, agregar el nuevo pedido a pedidosP
        this.pedidosP.push({
          numPedido: pedido.id,
          mesa: pedido.cuenta.mesa.nombre,
          platos: [pedido.platos],
          tipoPedido: pedido.tipo,
          hora: this.extractHour(pedido.fecha_hora_pedido),
          estado: pedido.estado.nombre
        });
      }
    });
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
  verPlatos(id:number,estadoP:string,tipo:string){
    const IdPedido=id;
    const estadoPedido=estadoP;
    const tipoPedido=tipo;
    const pedido = this.pedidosP.find(p => p.numPedido === id);
    this.platillos = pedido ? pedido.platos : [];
    this.pedidoCocina.setPedidoOrdenado(this.platillos,IdPedido,estadoPedido,tipoPedido);
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
