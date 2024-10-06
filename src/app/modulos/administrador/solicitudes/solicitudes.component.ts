import { Component, OnInit } from '@angular/core';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { PreRegistroService } from 'src/app/services/pre-registro/pre-registro.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  public preRegistros: FormularioPreRegistro[];
  public preRegistroSeleccionado: FormularioPreRegistro;
  public mostrarDetalle: boolean;
  public rechazoForm: FormGroup;
  // Para la paginación
  public registrosPorPagina: number = 7;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;

  constructor(private preRegistroService: PreRegistroService,
    private fb: FormBuilder,
    private location: Location,
    private toast: NgToastService) {
    this.preRegistros = [];
    this.preRegistroSeleccionado = {} as FormularioPreRegistro;
    this.mostrarDetalle = false;
    this.rechazoForm = this.fb.group({
      motivoRechazo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
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
        this.totalPaginas = Math.ceil(this.preRegistros.length / this.registrosPorPagina);
        console.log(this.preRegistros);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  get registrosPaginados(): FormularioPreRegistro[] {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    return this.preRegistros.slice(inicio, fin);
  }

  // Funciones para cambiar la página
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
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

  actualizarEstado(estado: string, motivoRechazo?: string) {
    this.preRegistroService.actualizarEstadoPreRegistro(this.preRegistroSeleccionado.id, estado, motivoRechazo).subscribe(
      (response) => {
        console.log(response);
        this.preRegistroSeleccionado.estado = estado;

        if (estado === 'rechazado') {
          this.showSuccess('El registro ha sido rechazado');
        } else {
          this.showSuccess('El registro ha sido confirmado');
        }

        this.mostrarDetalle = false;
      },
      (error) => {
        if (estado === 'rechazado') {
          this.showError('Ha ocurrido un error al rechazar el registro');
        } else {
          this.showError('Ha ocurrido un error al confirmar el registro');
        }
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
