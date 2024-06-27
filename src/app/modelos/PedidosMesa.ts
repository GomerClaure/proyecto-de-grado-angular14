export interface PedidosMesa {
    nombreMesa: string;
    estadoP:string;
    pedidos: any[]; // Aquí puedes definir el tipo específico de los pedidos si lo deseas
  }
export interface PedidosParaMostrarMesa{
  cantidad:number;
  nomplatillo:string;
  totalPedido:any;
}
export interface PedidosCocina{
  numPedido:number;
  mesa:string;
  platos: any[];
  tipoPedido:string;
  hora:string;
  estado:string;
}
export interface PedidosPlatos{
  nombre:any;
  cantidad:number;
  detalle:string;
}
  