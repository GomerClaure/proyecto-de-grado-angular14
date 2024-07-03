import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(BaseChartDirective) barChart: BaseChartDirective<'bar'> | undefined;
  @ViewChild('pieChart') pieChart: BaseChartDirective<'pie'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
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

  public barChartDataMonto: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Monto total de pedidos' },
    ],
  };

  public barChartDataCantidad: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Cantidad de pedidos' },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
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

  public fechaInicio: string; // hace siete dias
  public fechaFin: string; // hoy a las 11:59:59
  public reporte: Reporte;

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
      this.barChartDataMonto.labels = reporte.montoTotalPedidosPorDia.map((item) => item.fecha);
      this.barChartDataMonto.datasets[0].data = reporte.montoTotalPedidosPorDia.map((item) => item.monto);

      this.barChartDataCantidad.labels = reporte.cantidadPedidosPorDia.map((item) => item.fecha);
      this.barChartDataCantidad.datasets[0].data = reporte.cantidadPedidosPorDia.map((item) => item.cantidad);

      this.pieChartData.labels = reporte.cantidadPedidosPorMesa.map((item) => item.mesa);
      this.pieChartData.datasets[0].data = reporte.cantidadPedidosPorMesa.map((item) => item.cantidad_pedidos);

      this.barChart?.update();
      this.pieChart?.update();
      this.reporte = reporte;
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartDataMonto.datasets[0].data = this.barChartDataMonto.datasets[0].data.map(() => Math.round(Math.random() * 10000));
    this.barChartDataCantidad.datasets[0].data = this.barChartDataCantidad.datasets[0].data.map(() => Math.round(Math.random() * 10));
    this.barChart?.update();
  }
}
