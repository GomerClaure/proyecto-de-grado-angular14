import { Component, OnInit } from '@angular/core';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { PreRegistroService } from 'src/app/services/pre-registro/pre-registro.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  public preRegistros: FormularioPreRegistro[] = [];

  constructor(private preRegistroService: PreRegistroService) { }

  ngOnInit(): void {
    this.getPreRegistros();
  }

  public getPreRegistros() {
    this.preRegistroService.getPreRegistros().subscribe(
      (response) => {
        this.preRegistros = response.data;
        console.log(this.preRegistros);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getBadgeClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'bg-warning text-dark';
      case 'rechazado':
        return 'bg-danger';
      case 'aceptado':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  verDetalle(registro: FormularioPreRegistro) {
    // Aquí puedes mostrar un modal con todos los detalles del registro
    console.log('Detalles del registro:', registro);
    // Implementa la lógica para abrir el modal
  }

}
