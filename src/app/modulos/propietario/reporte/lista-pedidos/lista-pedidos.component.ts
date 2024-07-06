import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('barChart') barChart: BaseChartDirective<'bar'> | undefined;
  @ViewChild('lineChartMonto') lineChartMonto: BaseChartDirective<'line'> | undefined;
  @ViewChild('pieChart') pieChart: BaseChartDirective<'pie'> | undefined;

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

  public barChartType = 'bar' as const;
  public pieChartType = 'pie' as const;
  public lineChartType = 'line' as const;

  public fechaInicio: string;
  public fechaFin: string;
  public reporte: Reporte;
  public combinedData: any;

  constructor(private reporteService: ReporteService) {
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

        if (this.barChart) {
            this.barChart.chart?.update();
        }
        if (this.lineChartMonto) {
            this.lineChartMonto.chart?.update();
        }
        if (this.pieChart) {
            this.pieChart.chart?.update();
        }

        this.reporte = reporte;
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }
}
