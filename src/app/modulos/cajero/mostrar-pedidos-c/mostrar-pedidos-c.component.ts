import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetallePedidoCajero } from 'src/app/modelos/PedidosMesa';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';
import { Cuenta } from 'src/app/modelos/Cuenta';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  pedidos: DetallePedidoCajero[] = [];
  pedi: DetallePedidoCajero[] = [];
  pedidosPorMesa: Cuenta[] = [];
  errorMessage: string = '';
  id_restaurante: number = 0;
  id_empleado: number = 0;
  textoBuscador: string = '';

  constructor(private pedidococinaservice: PedidosCocinaService, private pedidoService: PedidoService, private cuentaService: CuentaService,
    private pedidoCocinaService: PedidosCocinaService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
    this.verificarPedidosNuevos();
  }

  verificarPedidosNuevos(): void {
    console.log('Verificando pedidos nuevos');
    this.pedidoCocinaService.pedidos$.subscribe(update => {
      // primero verificar si existe la cuenta en pedidosPorMesa, si existe, actualizarla, agregando el plato depues de hacer la pedicion por id pedido si no entonces pedir cuenta por id
      console.log('Pedido nuevo:', update);
      
      //busco la cuenta por id
      if (update?.evento === 'PedidoCreado') {
        const idCuenta = update?.datos.idCuenta;
        this.cuentaService.getCuenta(idCuenta).subscribe(
          response => {
            // Buscar si ya existe la cuenta para la mesa en pedidosPorMesa
            let cuentaExistente: Cuenta | undefined = this.pedidosPorMesa.find(cuenta => cuenta.id=== idCuenta);
            let cuentaObtenida: Cuenta = response.cuenta;
            console.log('Cuenta obtenida:', cuentaObtenida);
            console.log('Cuenta existente:', cuentaExistente);
            if (cuentaExistente) {
              cuentaExistente.platos = response.cuenta.platos;
            } else {
              console.log('Cuenta no encontrada, agregando cuenta:', cuentaObtenida);
              this.pedidosPorMesa.push(cuentaObtenida);
            }
           console.log('pedidos por mesa:', this.pedidosPorMesa);

          },
          error => {
            console.error('Error al obtener la cuenta:', error);
          }
        );

      }


    });
  }

  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_empleado, this.id_restaurante).subscribe(
      (response) => {
        this.pedidos = response.pedidos;
        console.log('pedidos que obtengo', this.pedidos)
        this.pedi = this.pedidos.filter(pedido => pedido.cuenta.estado === 'Abierta').map(pedido => ({
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

    // Recorremos cada pedido y lo agrupamos en el array pedidosPorMesa
    this.pedi.forEach(pedido => {
      const nombreMesa = pedido.cuenta.mesa.nombre;
      const estadoP = pedido.estado.nombre;
      const idCuenta = pedido.cuenta.id;
      const razon_social = pedido.cuenta.nombre_razon_social || 'Anonimo';
      const nit = pedido.cuenta.nit ? Number(pedido.cuenta.nit) : 0;

      // Filtrar cuentas con estado 'Pagada' o 'Cancelada'
      if (pedido.cuenta.estado === 'Pagada' || pedido.cuenta.estado === 'Cancelada') {
        return;
      }

      // Buscar si ya existe la cuenta para la mesa en pedidosPorMesa
      let cuentaExistente = this.pedidosPorMesa.find(cuenta => cuenta.id_mesa === pedido.cuenta.mesa.id);

      if (!cuentaExistente) {
        // Si no existe, creamos una nueva cuenta con la estructura Cuenta
        cuentaExistente = {
          id: idCuenta,
          id_mesa: pedido.cuenta.mesa.id,
          nombre_mesa: nombreMesa,
          estado: estadoP,
          nit: nit,
          nombre_razon_social: razon_social,
          monto_total: 0,  // Inicializamos el monto total en 0
          platos: []
        };
        // Agregamos la cuenta al array de pedidosPorMesa
        this.pedidosPorMesa.push(cuentaExistente);
      }

      // Recorrer los platillos en el pedido
      pedido.platos.forEach(platillo => {
        const subtotal = platillo.precio * platillo.pivot.cantidad;

        // Buscar si el platillo ya está en la cuenta
        const platilloExistente = cuentaExistente!.platos.find(p => p.id_platillo === platillo.id);

        if (platilloExistente) {
          // Si el platillo ya existe, actualizamos la cantidad y el subtotal
          platilloExistente.cantidad += platillo.pivot.cantidad;
          platilloExistente.precio += subtotal;  // Actualizamos el precio
        } else {
          // Si el platillo no existe, lo agregamos
          cuentaExistente!.platos.push({
            id: platillo.id,
            nombre: platillo.nombre,
            precio: subtotal,
            id_pedido: pedido.id,
            id_platillo: platillo.id,
            cantidad: platillo.pivot.cantidad
          });
        }

        // Actualizar el monto total de la cuenta
        cuentaExistente!.monto_total += subtotal;
      });
    });

    console.log('pedidos por mesa:', this.pedidosPorMesa);
  }

  onSearchChange(searchValue: string): void {
    this.textoBuscador = searchValue.trim().toLowerCase();
    console.log('Texto buscador:', this.textoBuscador);
    this.filtrarCuentas();
  }

  filtrarCuentas(): void {
    if (this.textoBuscador === '') {
      // Resetear la lista al estado original
      this.agruparPedidosPorMesa();
    } else {
      // Filtrar por nombre de mesa, id de cuenta o razón social
      this.pedidosPorMesa = this.pedidosPorMesa.filter(pedido =>
        pedido.nombre_mesa.trim().toLowerCase().includes(this.textoBuscador) ||
        pedido.nombre_razon_social.toLowerCase().includes(this.textoBuscador)
      );
    }
  }

  CerrarCuenta(id: number) {
    console.log(id);
    this.cuentaService.cerrarCuenta(id).subscribe(
      response => {
        console.log('Cuenta cerrada:', response);
        this.toast.success({ detail: "SUCCESS", summary: 'Se cerro la cuenta correctamente', duration: 2000 });
        this.pedidosPorMesa=this.pedidosPorMesa.filter(cuenta=>cuenta.id !==id)
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
