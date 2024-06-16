export interface PedidosMesa {
    nombreMesa: string;
    estadoP:string;
    pedidos: any[]; // Aquí puedes definir el tipo específico de los pedidos si lo deseas
  }
export interface PedidosParaMostrarMesa{
  cantidad:number;
  nomplatillo:string;
  totalPedido:number
}
export interface PedidosCocina{
  numPedido:number;
  mesa:string;
  platos: any[];
  tipoPedido:string;
  hora:string;
}
  