import { Platillo } from "./Platillo";

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
export interface PedidosCocina{
  numPedido:number;
  mesa:string;
  platos: any[];
  tipoPedido:string;
  hora:string;
  estado:string;
}

export interface DetallePedido{
  cuenta:{ estado: string, mesa: { nombre: string , id:number, id_restaurante:number}, id: number };
  estado: { id: number, nombre: string };
  monto: number;
  platos: Platillo[];
  tipo: string;
  updatedAt: string;
  id: number;
  id_estado:number;
  id_cuenta:number;
  id_empleado:number;
  fecha_hora_pedido:string;
};
  