export interface Notificacion {
    id: number;
    id_creador: number;
    id_pedido: number;
    id_restaurante: number;
    id_empleado: number;
    // tipo: string; "pedido"o "platillo"
    tipo: string;
    titulo: string;
    mensaje: string;
    created_at: Date;
    creado_hace: string;
    read_at: Date;
}
// {
//     "id": i,
//     "tipo": "pedido",
//     "titulo": "Virgil puso en preparación un pedido",
//     "mensaje": "Pedido de la MESA 1 en preparación.",
//     "created_at": "2024-06-03T15:51:10.000000Z",
//     "read_at": null
// }