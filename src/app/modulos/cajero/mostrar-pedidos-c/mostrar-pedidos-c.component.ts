import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetallePedidoCajero } from 'src/app/modelos/PedidosMesa';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';
import { Cuenta } from 'src/app/modelos/Cuenta';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  pedidosPorMesaCopy: Cuenta[] = [];
  pedidosPorMesa: Cuenta[] = [];
  errorMessage: string = '';
  id_restaurante: number = 0;
  id_empleado: number = 0;
  textoBuscador: string = '';

  constructor(private pedidoService: PedidoService, 
              private cuentaService: CuentaService,
              private pedidoCocinaService: PedidosCocinaService,
              private toastr:ToastrService) { }

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
              cuentaExistente.monto_total = response.cuenta.monto_total
            } else {
              console.log('Cuenta no encontrada, agregando cuenta:', cuentaObtenida);
              this.pedidosPorMesa.push(cuentaObtenida);
            }
            this.pedidosPorMesaCopy = this.pedidosPorMesa
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
    this.cuentaService.getCuentasAbiertas(this.id_restaurante).subscribe(
      (response) => {
        this.pedidosPorMesa = response.cuentas;
        console.log('pedidos que obtengo', this.pedidosPorMesa)
        this.pedidosPorMesaCopy = this.pedidosPorMesa;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }

  onSearchChange(searchValue: string): void {
    this.textoBuscador = searchValue.trim().toLowerCase();
    console.log('Texto buscador:', this.textoBuscador);
    this.filtrarCuentas();
  }

  filtrarCuentas(): void {
    if (this.textoBuscador === '') {
      // Resetear la lista al estado original
      this.pedidosPorMesa= this.pedidosPorMesaCopy;
    } else {
      // Filtrar por nombre de mesa, id de cuenta o razón social
      this.pedidosPorMesa= this.pedidosPorMesaCopy;
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
        this.toastr.success('Se cerro la cuenta correctamente','Exito');
        this.pedidosPorMesa=this.pedidosPorMesa.filter(cuenta=>cuenta.id !==id)
      },
      error => {
        console.error('error al cerrar:', error);
        this.toastr.info('No se puede cerrar la cuenta el pedido no ha sido entregado aun','Información');
      }
    );
  }
  imprimir() {
    window.print();
  }
}
