import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reporte } from 'src/app/modelos/Reporte';
import { ChartData, ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-plantilla-pedidos',
  templateUrl: './plantilla-pedidos.component.html',
  styleUrls: ['./plantilla-pedidos.component.scss']
})
export class PlantillaPedidosComponent implements OnInit {
public lineChartDataMonto!: ChartData<'line'>;
  public barChartDataCantidad!: ChartData<'bar'>;
  public pieChartData!: ChartData<'pie'>;
  public combinedData: any;
  public reporte: any;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = { /* ... */ };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = { /* ... */ };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = { /* ... */ };
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
