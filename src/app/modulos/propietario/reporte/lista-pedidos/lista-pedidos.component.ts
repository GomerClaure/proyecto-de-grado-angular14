import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { formatDate } from '@angular/common';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { Reporte } from 'src/app/modelos/Reporte';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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

  constructor(private reporteService: ReporteService,private cdr: ChangeDetectorRef) {
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
      cuentas: []
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
        this.cdr.detectChanges();
        
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }
}
