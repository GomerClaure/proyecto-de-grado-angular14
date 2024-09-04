import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';
import { fileValidator } from 'src/app/validators/file-validator';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() public preRegistro: FormularioPreRegistro;
  public preRegistroForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.preRegistro = {} as FormularioPreRegistro;
    this.preRegistroForm = this.fb.group({
      nombre_restaurante: ['', [Validators.required, Validators.minLength(3)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      celular_restaurante: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      correo_restaurante: ['', [Validators.required, Validators.email]],
      licencia_funcionamiento: ['', [Validators.required, fileValidator(['application/pdf'], 5)]],
      tipo_establecimiento: ['', Validators.required],
      nombre_propietario: ['', Validators.required],
      apellido_paterno_propietario: ['', Validators.required],
      apellido_materno_propietario: ['', Validators.required],
      correo_propietario: ['', [Validators.required, Validators.email]],
      cedula_identidad_propietario: ['', [Validators.required, Validators.pattern('^[0-9]{7}$')]],
      fotografia_propietario: [null, [Validators.required, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]],
      estado: ['', Validators.required],
      created_at: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.preRegistro) {
      this.preRegistroForm.patchValue(this.preRegistro);
    }
  }

  onSubmit(): void {
    if (this.preRegistroForm.valid) {
      console.log('Formulario válido:', this.preRegistroForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
