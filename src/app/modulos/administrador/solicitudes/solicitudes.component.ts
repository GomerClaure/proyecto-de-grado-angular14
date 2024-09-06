import { Component, OnInit } from '@angular/core';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { PreRegistroService } from 'src/app/services/pre-registro/pre-registro.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  public preRegistros: FormularioPreRegistro[];
  public preRegistroSeleccionado: FormularioPreRegistro;
  public mostrarDetalle: boolean;

  constructor(private preRegistroService: PreRegistroService,private location: Location,
   private toast: NgToastService) {
    this.preRegistros = [];
    this.preRegistroSeleccionado = {} as FormularioPreRegistro;
    this.mostrarDetalle = false;
   }

  ngOnInit(): void {
    this.getPreRegistros();
    window.addEventListener('popstate', (event) => {
      if (this.mostrarDetalle) {
        this.ocultarDetalle();
        event.preventDefault();
      }
    });
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
        return 'bg-secondary ';
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
    this.preRegistroSeleccionado = registro;
    this.mostrarDetalle = true;
    // Implementa la lógica para abrir el modal
  }
  ocultarDetalle() {
    this.mostrarDetalle = false;
    this.preRegistroSeleccionado = {} as FormularioPreRegistro;
    this.location.replaceState('/administrador/ver-formularios');
    // Implementa la lógica para cerrar el modal
  }

  confirmarPreRegistro(estado: string) {
    this.preRegistroService.confirmarPreRegistro(this.preRegistroSeleccionado.id, estado).subscribe(
      (response) => {
        console.log(response);
        this.preRegistroSeleccionado.estado = estado;
        this.showSuccess('El registro ha sido confirmado');
      },
      (error) => {
        this.showError('Ha ocurrido un error al confirmar el registro');
        console.error(error);
      }
    );
    
  }
  showError(message: string) {
    this.toast.error({ detail: "ERROR", summary: message, sticky: true });
  }

  showInfo(message: string) {
    this.toast.info({ detail: "INFO", summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message });

  }
}
