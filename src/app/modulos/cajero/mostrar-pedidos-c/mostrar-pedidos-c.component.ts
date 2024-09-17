import { Component, OnInit } from '@angular/core';
import { DetallePedidoCajero } from 'src/app/modelos/PedidosMesa';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

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

  constructor(private pedidoService: PedidoService, private cuentaService:CuentaService) {}

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
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
      pedidos: DetallePedidoCajero[], 
      idCuenta: number, 
      razon_social: string, 
      nit: number 
    }>();
  
    this.pedi.forEach(pedido => {
      const nombreMesa = pedido.cuenta.mesa.nombre;
      const estadoP = pedido.estado.nombre;
      const idCuenta = pedido.cuenta.id;
      const razon_social = pedido.cuenta.nombre_razon_social;
      const nit = pedido.cuenta.nit ? Number(pedido.cuenta.nit) : 0;
      if (pedido.cuenta.estado === 'Pagada' || pedido.cuenta.estado ==='Cancelada') {
        return;
      }
      if (!mesasMap.has(nombreMesa)) {
        mesasMap.set(nombreMesa, {
          nombreMesa: nombreMesa,
          estadoP: estadoP,
          pedidos: [pedido],
          idCuenta: idCuenta,
          razon_social: razon_social || 'Anonimo',
          nit: nit
        });
      } else {
        mesasMap.get(nombreMesa)?.pedidos.push(pedido);
      }
    });
    this.pedidosPorMesa = Array.from(mesasMap.values());
    console.log('pedidos por mesa a ver que onda',this.pedidosPorMesa)
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
      // Update UI or alert the user that the account was closed
    },
    error => {
      console.error('error al cerrar:', error);
      // Handle error (e.g., show an error message)
    }
  );
  }
}

