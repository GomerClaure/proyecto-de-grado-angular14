
export interface Cuenta {
    id: number;
    id_mesa: number;
    nombre_mesa: string;
    estado: string;
    nit: number;
    nombre_razon_social: string;
    monto_total: number;
    platos: PlatilloCuenta[];

};

export interface PlatilloCuenta {
    id: number;
    nombre: string;
    precio: number;
    id_pedido: number;
    id_platillo: number;
    cantidad: number;
};