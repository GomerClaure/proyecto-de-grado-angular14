export interface Reporte {
    montoTotalPedidosPorDia: { fecha: Date; monto: number }[];
    cantidadPedidosPorDia: { fecha: Date; cantidad: number }[];
    cantidadPedidosPorMesa: { mesa: string; cantidad_pedidos: number }[];
    cuentas: { id: number }[];
    pedidoPorCuenta: {
      [cuentaId: string]: {
        [pedidoId: string]: Pedido;
      };
    };
  }
  
  export interface Pedido {
    empleado: {
      nombre: string;
      apellido: string;
    };
    estado_pedido: string;
    monto: number;
    fecha_hora_cuenta: Date;
    platillos: {
      id_platillo: number;
      nombre: string;
      precio: number;
      cantidad: number;
      detalle: string;
    }[];
  }