import { Component, OnInit } from '@angular/core';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { PreRegistroService } from 'src/app/services/pre-registro/pre-registro.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  public registrosPorPagina: number = 7;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;

  constructor(private preRegistroService: PreRegistroService,
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private router: Router) {
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
    this.preRegistroSeleccionado = registro;
    this.preRegistroService.setPreRegistroSeleccionado(registro);
    this.router.navigate(['/administrador/detalle-solicitud'])
  }
  ocultarDetalle() {
    this.mostrarDetalle = false;
    this.preRegistroSeleccionado = {} as FormularioPreRegistro;
    this.location.replaceState('/administrador/detalle-solicitud');
  }

  actualizarEstado(estado: string, motivoRechazo?: string) {
    this.preRegistroService.actualizarEstadoPreRegistro(this.preRegistroSeleccionado.id, estado, motivoRechazo).subscribe(
      (response) => {
        this.preRegistroSeleccionado.estado = estado;

        if (estado === 'rechazado') {
          this.toastr.success('El registro ha sido rechazado','Exito');
        } else {
          this.toastr.success('El registro ha sido confirmado','Exito');
        }

        this.mostrarDetalle = false;
      },
      (error) => {
        if (estado === 'rechazado') {
          this.toastr.error('Ha ocurrido un error al rechazar el registro',"Error");
        } else {
          this.toastr.error('Ha ocurrido un error al confirmar el registro','Error');
        }
      }
    );
  }

}
