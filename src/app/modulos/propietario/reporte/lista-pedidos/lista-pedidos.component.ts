import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { Reporte } from 'src/app/modelos/Reporte';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  public fechaInicio: Date;// hace siete dias
  public fechaFin: Date;// hoy a las 11:59:59
  public reporte: Reporte;
  selectedDate: string;
  pedidos: any[] = ['hi'];
  chartData: any[] = [];
  chartLabels: string[] = [];

  constructor(private reporteService: ReporteService) {
    this.fechaInicio = new Date();
    this.fechaInicio.setDate(this.fechaInicio.getDate() - 7);
    this.fechaFin = new Date();
    this.fechaFin.setHours(23, 59, 59);
    this.reporte = {
      pedidos: [],
      cuentas: {id: 0}};
    this.selectedDate = '';
    }

  ngOnInit(): void {

  }

  generarReporte() {
    const idRestaurante = sessionStorage.getItem('id_restaurante');
    const formData = new FormData();
    formData.append('fecha_inicio', this.fechaInicio.toISOString());
    formData.append('fecha_fin', this.fechaFin.toISOString());
    formData.append('id_restaurante', idRestaurante || '');
    this.reporteService.getReportePedidos(formData).subscribe((reporte: Reporte) => {
      console.log(reporte);
      // this.reporte = reporte;
    });


  }

}
