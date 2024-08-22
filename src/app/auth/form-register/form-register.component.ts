import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  restauranteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.restauranteForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.restauranteForm = this.fb.group({
      nombreRestaurante: ['', [Validators.required, Validators.minLength(3)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      numeroCelular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correoRestaurante: ['', [Validators.required, Validators.email]],
      licenciaFuncionamiento: ['', Validators.required],
      ubicacionRestaurante: ['', Validators.required],
      tipoEstablecimiento: ['', Validators.required],
      nombrePropietario: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correoPropietario: ['', [Validators.required, Validators.email]],
      cedulaIdentidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fotografiaPropietario: ['', Validators.required]
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.restauranteForm.patchValue({
        [controlName]: file
      });
      this.restauranteForm.get(controlName)?.markAsTouched();
    }
  }
  

  onSubmit(): void {
    if (this.restauranteForm.valid) {
      console.log(this.restauranteForm.value);
    }
  }
}

