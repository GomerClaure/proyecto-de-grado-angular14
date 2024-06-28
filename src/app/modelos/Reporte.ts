import { Pedido } from './Pedido';	

export interface Reporte {
    pedidos: Pedido[];
    cuentas: {
        id: number;
    }
}