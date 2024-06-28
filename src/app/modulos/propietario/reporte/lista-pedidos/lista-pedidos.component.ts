import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { Reporte } from 'src/app/modelos/Reporte';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  public fechaInicio: string;// hace siete dias
  public fechaFin: string;// hoy a las 11:59:59
  public reporte: Reporte;

  constructor(private reporteService: ReporteService) {
    var fechaIni = new Date();
    fechaIni.setDate(fechaIni.getDate() - 7);
    this.fechaInicio = fechaIni.toISOString().split('T')[0];
    var fechaFin = new Date();
    fechaFin.setHours(23, 59, 59);
    this.fechaFin = fechaFin.toISOString().split('T')[0];
    this.reporte = {
      montoTotalPedidosPorDia: [],
      cantidadPedidosPorDia: [],
      cantidadPedidosPorMesa: [],
      cuentas: []
    };
    }

  ngOnInit(): void {

  }

  generarReporte() {
    const idRestaurante = sessionStorage.getItem('id_restaurante');
    console.log('fechaInicio', this.fechaInicio);
    console.log('fechaFin', this.fechaFin);
    const formData = new FormData();
    formData.append('fecha_inicio', this.fechaInicio);
    formData.append('fecha_fin', this.fechaFin);
    formData.append('id_restaurante', idRestaurante || '');
    this.reporteService.getReportePedidos(formData).subscribe((reporte: Reporte) => {
      console.log(reporte);
      this.reporte = reporte;
    });


  }

}
