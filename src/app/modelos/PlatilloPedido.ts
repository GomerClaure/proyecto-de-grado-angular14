export interface PlatilloPedido {
    id_platillo: number;
    precio_unitario: number;
    cantidad: number;
    detalle?: string; // La descripción es opcional
    
}  