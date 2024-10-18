import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { PreRegistroService } from 'src/app/services/pre-registro/pre-registro.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  public preRegistro: FormularioPreRegistro;
  URL_BACKEND: string;
  previewUrlSafe: any;
  imgURLSafe: any;
  public preRegistroForm: FormGroup;

  constructor(private fb: FormBuilder, private preRegistroService: PreRegistroService,
    public sanitizer: DomSanitizer, private toast: NgToastService,private router: Router) {
    this.preRegistro = {} as FormularioPreRegistro;
    this.preRegistroForm = this.fb.group({
      nombre_restaurante: [''],
      nit: [''],
      celular_restaurante: [''],
      correo_restaurante: [''],
      licencia_funcionamiento: [''],
      tipo_establecimiento: [''],
      nombre_propietario: [''],
      apellido_paterno_propietario: [''],
      apellido_materno_propietario: [''],
      correo_propietario: [''],
      cedula_identidad_propietario: [''],
      fotografia_propietario: [null],
      estado: [''],
      created_at: [''],
      id: [''],
      latitud: [''],
      longitud: [''],
      numero_mesas: [''],
      motivoRechazo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
    this.URL_BACKEND = environment.backendStorageUrl;
    this.previewUrlSafe = '';
    this.imgURLSafe = '';
  }

  ngOnInit(): void {
    this.preRegistroService.getPreRegistro().subscribe(form => {
      if (form.id) {
        this.preRegistro = form;
      }else{
        console.log('esta vacio')
        this.router.navigate(['/administrador/ver-formularios'])
      }
    });

    if (this.preRegistro) {
      this.preRegistroForm.patchValue(this.preRegistro);
      this.previewUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL_BACKEND + this.preRegistro.licencia_funcionamiento);
      this.imgURLSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL_BACKEND + this.preRegistro.fotografia_propietario);;
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

  actualizarEstado(estado: string, motivoRechazo?: string) {
    console.log('actualizarEstado')
    this.preRegistroService.actualizarEstadoPreRegistro(this.preRegistro.id, estado, motivoRechazo).subscribe(
      (response) => {
        console.log(response);
        this.preRegistro.estado = estado;

        if (estado === 'rechazado') {
          this.showSuccess('El registro ha sido rechazado');
        } else {
          this.showSuccess('El registro ha sido confirmado');
        }
        this.router.navigate(['/administrador/ver-formularios'])
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
