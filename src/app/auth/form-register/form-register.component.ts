import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  restauranteForm: FormGroup;
  currentStep = 1;

  constructor(private fb: FormBuilder) {
    this.restauranteForm = this.fb.group({
      pasoUno: this.fb.group({
        nombreRestaurante: ['', [Validators.required, Validators.minLength(3)]],
        nit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        numeroCelular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        correoRestaurante: ['', [Validators.required, Validators.email]],
        licenciaFuncionamiento: ['', Validators.required],
      }),
      pasoDos: this.fb.group({
        ubicacionRestaurante: ['', Validators.required],
        tipoEstablecimiento: ['', Validators.required],
      }),
      pasoTres: this.fb.group({
        nombrePropietario: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        correoPropietario: ['', [Validators.required, Validators.email]],
        cedulaIdentidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        fotografiaPropietario: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    
  }
  get pasoUnoForm(): FormGroup {
    return this.restauranteForm.get('pasoUno') as FormGroup;
  }

  get pasoDosForm(): FormGroup {
    return this.restauranteForm.get('pasoDos') as FormGroup;
  }

  get pasoTresForm(): FormGroup {
    return this.restauranteForm.get('pasoTres') as FormGroup;
  }

  // Métodos para avanzar y retroceder entre pasos
  goToNextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.restauranteForm.valid) {
      console.log(this.restauranteForm.value);
    }
  }
}
