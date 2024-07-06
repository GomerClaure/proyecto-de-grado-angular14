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

  public barChartOptions: ChartConfiguration<'bar'>['options'] = { /* ... */ };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = { /* ... */ };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = { /* ... */ };
  public barChartType: 'bar' = 'bar' as const;
  public pieChartType: 'pie' = 'pie' as const;
  public lineChartType: 'line' = 'line' as const;

  constructor(private router: Router) { }

  ngOnInit(): void {
    //quiero obtener el elemendo dee clase fondo
    const fondo = document.querySelector('.fondo');
    // if (fondo) {
    //   fondo.classList.add('fondo-blanco');
    // }
    const navigation = window.history.state;
    this.lineChartDataMonto = navigation.lineChartDataMonto;
    this.barChartDataCantidad = navigation.barChartDataCantidad;
    this.pieChartData = navigation.pieChartData;
    this.combinedData = navigation.combinedData;
    this.reporte = navigation.reporte;
    setTimeout(() => {
      fondo?.classList.remove('fondo-blanco');
      this.imprimir();
      // this.router.navigate(['/reporte/pedidos']);
    }, 1000);
  }

  public imprimir() {
    window.print();
  }
}
