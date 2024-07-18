export interface Pedido {
    id: number;
    id_cuenta: number;
    tipo: string;
    id_estado: number;
    id_empleado: number;
    fecha_hora_pedido: Date;
    monto: number;
}