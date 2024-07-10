import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartConfiguration } from 'chart.js';
import { Reporte } from 'src/app/modelos/Reporte';

@Component({
  selector: 'app-plantilla-lista-pedidos',
  templateUrl: './plantilla-lista-pedidos.component.html',
  styleUrls: ['./plantilla-lista-pedidos.component.scss']
})
export class PlantillaListaPedidosComponent implements OnInit {
  public lineChartDataMonto!: ChartData<'line'>;
  public barChartDataCantidad!: ChartData<'bar'>;
  public pieChartData!: ChartData<'pie'>;
  public combinedData: any;
  public reporte: Reporte;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: 'bar' = 'bar' as const;
  public pieChartType: 'pie' = 'pie' as const;
  public lineChartType: 'line' = 'line' as const;

  constructor(private router: Router) {
    this.reporte = {
      montoTotalPedidosPorDia: [],
      cantidadPedidosPorDia: [],
      cantidadPedidosPorMesa: [],
      cuentas: [],
      pedidoPorCuenta: {},
    };
   }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.lineChartDataMonto = navigation.lineChartDataMonto;
    this.barChartDataCantidad = navigation.barChartDataCantidad;
    this.pieChartData = navigation.pieChartData;
    this.combinedData = navigation.combinedData;
    this.reporte = navigation.reporte;

    setTimeout(() => {
      this.imprimir();
    }, 1000);
  }

  public imprimir() {
    window.print();
    this.router.navigate(['/reporte/pedidos']);
  }

  getPedidoIds(cuentaId: number): string[] {
    console.log(this.reporte.pedidoPorCuenta);
    return this.reporte.pedidoPorCuenta && this.reporte.pedidoPorCuenta[cuentaId]
      ? Object.keys(this.reporte.pedidoPorCuenta[cuentaId])
      : [];
  }
  
  getEmpleado(cuentaId: number, pedidoId: string) {
    return this.reporte.pedidoPorCuenta && this.reporte.pedidoPorCuenta[cuentaId] && this.reporte.pedidoPorCuenta[cuentaId][pedidoId]
      ? this.reporte.pedidoPorCuenta[cuentaId][pedidoId].empleado
      : { nombre: '', apellido: '' };
  }
  
  getEstadoPedido(cuentaId: number, pedidoId: string) {
    return this.reporte.pedidoPorCuenta && this.reporte.pedidoPorCuenta[cuentaId] && this.reporte.pedidoPorCuenta[cuentaId][pedidoId]
      ? this.reporte.pedidoPorCuenta[cuentaId][pedidoId].estado_pedido
      : '';
  }
  
  getPlatillos(cuentaId: number, pedidoId: string) {
    return this.reporte.pedidoPorCuenta && this.reporte.pedidoPorCuenta[cuentaId] && this.reporte.pedidoPorCuenta[cuentaId][pedidoId]
      ? this.reporte.pedidoPorCuenta[cuentaId][pedidoId].platillos
      : [];
  }
}
