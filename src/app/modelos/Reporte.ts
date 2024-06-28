import { Pedido } from './Pedido';	
// "montoTotalPedidosPorDia": [
//     {
//         "fecha": "2024-06-25",
//         "monto": "180.00"
//     },
//     {
//         "fecha": "2024-06-24",
//         "monto": "45.00"
//     }
// ],
// "cantidadPedidosPorDia": [
//     {
//         "fecha": "2024-06-25",
//         "cantidad": 3
//     },
//     {
//         "fecha": "2024-06-24",
//         "cantidad": 1
//     }
// ],
// "cantidadPedidosPorMesa": [
//     {
//         "mesa": "Mesa 1",
//         "cantidad_pedidos": 2
//     },
//     {
//         "mesa": "Mesa 2",
//         "cantidad_pedidos": 2
//     }
// ],
// "cuentas": [
//     {
//         "id": 1
//     },
//     {
//         "id": 2
//     },
//     {
//         "id": 3
//     }
// ]
export interface Reporte {
    montoTotalPedidosPorDia: {fecha:Date, monto:number}[];
    cantidadPedidosPorDia: {fecha:Date, cantidad:number}[];
    cantidadPedidosPorMesa: {mesa:string, cantidad_pedidos:number}[];
    cuentas: {id:number}[];
}