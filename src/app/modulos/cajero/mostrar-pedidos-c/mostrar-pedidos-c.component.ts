import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetallePedidoCajero } from 'src/app/modelos/PedidosMesa';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  pedidos:DetallePedidoCajero[] = [];
  pedi:DetallePedidoCajero[]=[];
  pedidosPorMesa: any[] = [];
  errorMessage: string = '';
  id_restaurante: number = 0;
  id_empleado: number = 0;
  textoBuscador:string = '';

  constructor(private pedidococinaservice:PedidosCocinaService, private pedidoService: PedidoService, private cuentaService:CuentaService) {}

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
    this.pedidococinaservice.pedidos$.subscribe(update=>{
       console.log('pedido',update)
    })
  }
  
  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_empleado, this.id_restaurante).subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        console.log('pedidos que obtengo',this.pedidos)
        this.pedi = this.pedidos .filter(pedido => pedido.cuenta.estado === 'Abierta').map(pedido => ({
          cuenta: pedido.cuenta,
          estado: pedido.estado,
          monto: pedido.monto,
          platos: pedido.platos,
          tipo: pedido.tipo,
          updatedAt: pedido.updatedAt,
          id: pedido.id,
          id_estado: pedido.id_estado,
          id_cuenta: pedido.id_cuenta,
          id_empleado: pedido.id_empleado,
          fecha_hora_pedido: pedido.fecha_hora_pedido
        }));
        console.log('Pedidos mapeados:', this.pedi);
        this.agruparPedidosPorMesa();
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }

  agruparPedidosPorMesa(): void {
    this.pedidosPorMesa = [];
  
    const mesasMap = new Map<string, { 
      nombreMesa: string, 
      estadoP: string, 
      pedidos: { platillo: any, cantidad: number, subtotal: number }[], 
      idCuenta: number, 
      razon_social: string, 
      nit: number,
      montoTotal: number 
    }>();
  
    this.pedi.forEach(pedido => {
      const nombreMesa = pedido.cuenta.mesa.nombre;
      const estadoP = pedido.estado.nombre;
      const idCuenta = pedido.cuenta.id;
      const razon_social = pedido.cuenta.nombre_razon_social || 'Anonimo';
      const nit = pedido.cuenta.nit ? Number(pedido.cuenta.nit) : 0;
  
      // Filtrar estados no deseados
      if (pedido.cuenta.estado === 'Pagada' || pedido.cuenta.estado === 'Cancelada') {
        return;
      }
  
      // Procesar los platos en el pedido
      pedido.platos.forEach(platillo => {
        const subtotal = platillo.precio * platillo.pivot.cantidad; // Suponiendo que pivot.cantidad tiene la cantidad
  
        const platilloExistente = mesasMap.get(nombreMesa);
  
        if (!platilloExistente) {
          mesasMap.set(nombreMesa, {
            nombreMesa: nombreMesa,
            estadoP: estadoP,
            pedidos: [{ platillo: platillo, cantidad: platillo.pivot.cantidad, subtotal: subtotal }],
            idCuenta: idCuenta,
            razon_social: razon_social,
            nit: nit,
            montoTotal: subtotal // Inicializamos el monto total
          });
        } else {
          const platilloIndex = platilloExistente.pedidos.findIndex(p => p.platillo.id === platillo.id);
          if (platilloIndex > -1) {
            // Aumentar cantidad y subtotal si el platillo ya existe
            platilloExistente.pedidos[platilloIndex].cantidad += platillo.pivot.cantidad;
            platilloExistente.pedidos[platilloIndex].subtotal += subtotal; // Actualizar el subtotal
          } else {
            // Si es un platillo nuevo, añadirlo
            platilloExistente.pedidos.push({ platillo: platillo, cantidad: platillo.pivot.cantidad, subtotal: subtotal });
          }
          // Actualizar el monto total
          platilloExistente.montoTotal += subtotal;
        }
      });
    });
  
    this.pedidosPorMesa = Array.from(mesasMap.values());
    console.log('pedidos por mesa a ver que onda', this.pedidosPorMesa);
  }
  


  
  onSearchChange(searchValue: string): void {  
    this.textoBuscador = searchValue.trim().toLowerCase();
    this.filtrarCuentas();
  }
  filtrarCuentas(): void {
    if (this.textoBuscador === '') {
      // Reset the list to the original array if the search is empty
      this.agruparPedidosPorMesa(); // Re-group the orders by table
    } else {
      // Filter the grouped orders by table name, table number (idCuenta), or social reason (razon_social)
      this.pedidosPorMesa = this.pedidosPorMesa.filter(pedido =>
        pedido.nombreMesa.toLowerCase().includes(this.textoBuscador) ||
        pedido.idCuenta.toString().includes(this.textoBuscador) ||
        pedido.razon_social.toLowerCase().includes(this.textoBuscador)
      );
      
    }
  }
  CerrarCuenta(id:number){
   console.log(id);
   this.cuentaService.cerrarCuenta(id).subscribe(
    response => {
      console.log('Cuenta cerrada:', response);
    },
    error => {
      console.error('error al cerrar:', error);
    }
  );
  }

  imprimir() {
  window.print();
}
}

