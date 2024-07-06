import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartConfiguration } from 'chart.js';

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
  public reporte: any;

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

  constructor(private router: Router) { }

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
}
