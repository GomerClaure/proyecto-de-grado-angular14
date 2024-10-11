import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() public preRegistro: FormularioPreRegistro;
  URL_BACKEND: string ;
  previewUrlSafe: any;
  imgURLSafe: any;
  public preRegistroForm: FormGroup;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) { 
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
      numero_mesas: ['']
    });
    this.URL_BACKEND = environment.backendStorageUrl;
    this.previewUrlSafe = '';
    this.imgURLSafe = '';
  }

  ngOnInit(): void {
    if (this.preRegistro) {
      this.preRegistroForm.patchValue(this.preRegistro);
      this.previewUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL_BACKEND+this.preRegistro.licencia_funcionamiento);
      this.imgURLSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL_BACKEND+this.preRegistro.fotografia_propietario);;
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

}
