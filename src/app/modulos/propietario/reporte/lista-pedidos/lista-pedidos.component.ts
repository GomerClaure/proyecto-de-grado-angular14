import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { formatDate } from '@angular/common';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { Reporte } from 'src/app/modelos/Reporte';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

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

  public lineChartDataMonto: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Monto total de pedidos',
        backgroundColor: 'rgba(212, 167, 66, 0.2)',
        borderColor: '#d6a742',
        pointBackgroundColor: '#d6a742',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(212, 167, 66, 0.8)',
        fill: 'origin',
      },
    ],
  };

  public barChartDataCantidad: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cantidad de pedidos',
        backgroundColor: '#70c1b3',
        borderColor: 'rgba(112, 193, 179, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(112, 193, 179, 0.4)',
        hoverBorderColor: 'rgba(112, 193, 179, 1)',
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Cantidad de pedidos por mesa' },
    ],
  };

  public barChartType : 'bar' = 'bar' as const;
  public pieChartType : 'pie' = 'pie' as const;
  public lineChartType : 'line' = 'line' as const;

  public fechaInicio: string;
  public fechaFin: string;
  public reporte: Reporte;
  public combinedData: any;
  public pageSize: number = 10; // Cantidad de elementos por página
  public currentPage: number = 1; // Página actual
  public noHayPedidos = false;

  constructor(private reporteService: ReporteService,private cdr: ChangeDetectorRef, private router: Router) {
    const fechaIni = new Date();
    fechaIni.setDate(fechaIni.getDate() - 7);
    this.fechaInicio = fechaIni.toISOString().split('T')[0];
    
    const fechaFin = new Date();
    fechaFin.setHours(23, 59, 59);
    this.fechaFin = fechaFin.toISOString().split('T')[0];

    this.reporte = {
      montoTotalPedidosPorDia: [],
      cantidadPedidosPorDia: [],
      cantidadPedidosPorMesa: [],
      cuentas: [],
      pedidoPorCuenta: {}
    };
  }

  ngOnInit(): void {}

  generarReporte() {
    const idRestaurante = sessionStorage.getItem('id_restaurante');
    const formData = new FormData();
    formData.append('fecha_inicio', this.fechaInicio);
    formData.append('fecha_fin', this.fechaFin);
    formData.append('id_restaurante', idRestaurante || '');

    this.reporteService.getReportePedidos(formData).subscribe((reporte: Reporte) => {
      this.reporte = reporte;
      console.log(reporte);
        this.combinedData = reporte.cantidadPedidosPorDia.map((cantidadItem, index) => {
            const fecha = formatDate(cantidadItem.fecha, 'dd-MM-yyyy', 'en-US');
            const montoItem = reporte.montoTotalPedidosPorDia[index];
            return {
                fecha: fecha,
                cantidad: cantidadItem.cantidad,
                monto: montoItem ? montoItem.monto : 0
            };
        });

        this.lineChartDataMonto.labels = reporte.montoTotalPedidosPorDia.map((item) => {
            return formatDate(item.fecha, 'dd-MM-yyyy', 'en-US');
        });
        this.lineChartDataMonto.datasets[0].data = reporte.montoTotalPedidosPorDia.map((item) => item.monto);

        this.barChartDataCantidad.labels = reporte.cantidadPedidosPorDia.map((item) => {
            return formatDate(item.fecha, 'dd-MM-yyyy', 'en-US');
        });
        this.barChartDataCantidad.datasets[0].data = reporte.cantidadPedidosPorDia.map((item) => item.cantidad);

        this.pieChartData.labels = reporte.cantidadPedidosPorMesa.map((item) => item.mesa);
        this.pieChartData.datasets[0].data = reporte.cantidadPedidosPorMesa.map((item) => item.cantidad_pedidos);

        this.charts.forEach((child) => {
          child.chart?.update()
      });
      this.noHayPedidos = this.reporte.cuentas.length === 0;
        
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public imprimir() {
    this.router.navigate(['reporte/plantilla-pedidos'], {
      state: {
        lineChartDataMonto: this.lineChartDataMonto,
        barChartDataCantidad: this.barChartDataCantidad,
        pieChartData: this.pieChartData,
        combinedData: this.combinedData,
        reporte: this.reporte
      }
    });
  }
  get pagedCuentas(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.reporte.cuentas.slice(startIndex, startIndex + this.pageSize);
  }

  get pageCount(): number {
    return Math.ceil(this.reporte.cuentas.length / this.pageSize);
  }

  get pagesArray(): number[] {
    return Array(this.pageCount).fill(0).map((x, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pageCount) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getPedidoIds(cuentaId: number): string[] {
    return this.reporte.pedidoPorCuenta && this.reporte.pedidoPorCuenta[cuentaId]
      ? Object.keys(this.reporte.pedidoPorCuenta[cuentaId])
      : [];
  }
  
  getEmpleado(cuentaId: number, pedidoId: string) {
    return this.reporte.pedidoPorCuenta[cuentaId.toString()][pedidoId].empleado;
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
  
  getSubtotal(cuentaId: number, pedidoId: string): number {
    const monto = this.reporte.pedidoPorCuenta[cuentaId.toString()][pedidoId].monto;
    return typeof monto === 'number' ? monto : parseFloat(monto);
  }
  
  
  getTotal(cuentaId: number): number {
    let total = 0;
    const pedidos = this.reporte.pedidoPorCuenta[cuentaId.toString()];
    for (let pedidoId in pedidos) {
      const monto = pedidos[pedidoId].monto;
      total += typeof monto === 'number' ? monto : parseFloat(monto);
    }
    return total;
  }
}
