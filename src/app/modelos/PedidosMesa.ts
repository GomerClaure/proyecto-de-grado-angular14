
import { Categoria } from "./Categoria";

export interface PedidosMesa {
    nombreMesa: string;
    estadoP:string;
    pedidos: any[]; // Aquí puedes definir el tipo específico de los pedidos si lo deseas
    idCuenta:any;
  }
export interface PedidosParaMostrarMesa{
  cantidad:number;
  nomplatillo:string;
  totalPedido:any;
}
export interface PedidosCocina{
  id: number;
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
export interface PlatilloPedido {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  id_menu: number;
  categoria: Categoria;
  plato_disponible_menu: boolean;
  pivot: {cantidad: number, detalle: string, id_pedido: number, id_platillo: number};
}

export interface DetallePedido{
  cuenta:{ estado: string, mesa: { nombre: string , id:number, id_restaurante:number}, id: number };
  estado: { id: number, nombre: string };
  monto: number;
  platos: PlatilloPedido[];
  tipo: string;
  updatedAt: string;
  id: number;
  id_estado:number;
  id_cuenta:number;
  id_empleado:number;
  fecha_hora_pedido:string;
  nombre_razon_social:string;
  nit:any;
};

export interface DetallePedidoCajero {
  cuenta: { 
    estado: string; 
    mesa: { nombre: string; id: number; id_restaurante: number }; 
    id: number; 
    // Aquí puedes agregar nombre_razon_social y nit si están en cuenta
    nombre_razon_social?: string;
    nit?: number;
  };
  estado: { id: number; nombre: string };
  monto: number;
  platos: PlatilloPedido[];
  tipo: string;
  updatedAt: string;
  id: number;
  id_estado: number;
  id_cuenta: number;
  id_empleado: number;
  fecha_hora_pedido: string;
}


export interface PedidosPorMesa {
    id_cuenta:number;
    monto_total:number;
    nombreMesa: string;
    estado_cuenta:string;
    pedidos: PlatosPedidos[]; // Aquí puedes definir el tipo específico de los pedidos si lo deseas
}
export interface PlatosPedidos{
  id_pedido:number;
  estado:string;
  platos: Platos[];
  monto:number;
}

export interface Platos{
  nombre:any;
  precio_fijado:number;
  cantidad:number;
  detalle:string;
}