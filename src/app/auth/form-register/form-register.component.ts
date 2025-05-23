import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreRegistroService } from 'src/app/services/pre-registro/pre-registro.service';
import { fileValidator } from 'src/app/validators/file-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit, AfterViewInit {

  restauranteForm: FormGroup;
  currentStep = 0;

  constructor(private fb: FormBuilder, private preRegistroService: PreRegistroService,
    private toastr: ToastrService
  ) {
    this.restauranteForm = this.fb.group({
      pasoUno: this.fb.group({
        nombreRestaurante: ['', [Validators.required, Validators.minLength(3)]],
        nit: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
        numeroCelular: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        correoRestaurante: ['', [Validators.required, Validators.email]],
        licenciaFuncionamiento: ['', [Validators.required, fileValidator(['application/pdf'], 5)]],
      }),
      pasoDos: this.fb.group({
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        pais: ['', Validators.required],
        departamento: ['', Validators.required],
        tipoEstablecimiento: ['', Validators.required],
      }),
      pasoTres: this.fb.group({
        nombrePropietario: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        correoPropietario: ['', [Validators.required, Validators.email]],
        cedulaIdentidad: ['', [Validators.required, Validators.pattern('^[0-9]{7}$')]],
        fotografiaPropietario: [null, [Validators.required, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]],
        numeroMesas: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(20)]],
      })
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Espera un pequeño delay para asegurar que el DOM está completamente cargado
    setTimeout(() => {
      this.currentStep = 1;
    }, 200); // Ajusta el tiempo según sea necesario
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
    if (this.currentStep < 3 && this.pasoActualValido()) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1 && this.pasoActualValido()) {
      this.currentStep--;
    }
  }

  pasoActualValido(): boolean {
    let esValido = false;
    if (this.currentStep === 1) {
      this.pasoUnoForm.markAllAsTouched();
      esValido = this.pasoUnoForm.valid;
    } else if (this.currentStep === 2) {
      this.pasoDosForm.markAllAsTouched();
      esValido = this.pasoDosForm.valid;
    } else if (this.currentStep === 3) {
      this.pasoTresForm.markAllAsTouched();
      esValido = this.pasoTresForm.valid;
    }
    return esValido;

  }

  onSubmit(): void {
    let formData = new FormData();
    formData.append('nombre_restaurante', this.restauranteForm.get('pasoUno.nombreRestaurante')?.value);
    formData.append('nit', this.restauranteForm.get('pasoUno.nit')?.value);
    formData.append('celular_restaurante', this.restauranteForm.get('pasoUno.numeroCelular')?.value);
    formData.append('correo_restaurante', this.restauranteForm.get('pasoUno.correoRestaurante')?.value);
    formData.append('tipo_establecimiento', this.restauranteForm.get('pasoDos.tipoEstablecimiento')?.value);
    formData.append('latitud', this.restauranteForm.get('pasoDos.latitud')?.value);
    formData.append('longitud', this.restauranteForm.get('pasoDos.longitud')?.value);
    formData.append('nombre_propietario', this.restauranteForm.get('pasoTres.nombrePropietario')?.value);
    formData.append('apellido_paterno_propietario', this.restauranteForm.get('pasoTres.apellidoPaterno')?.value);
    formData.append('apellido_materno_propietario', this.restauranteForm.get('pasoTres.apellidoMaterno')?.value);
    formData.append('correo_propietario', this.restauranteForm.get('pasoTres.correoPropietario')?.value);
    formData.append('cedula_identidad_propietario', this.restauranteForm.get('pasoTres.cedulaIdentidad')?.value);
    formData.append('licencia_funcionamiento', this.restauranteForm.get('pasoUno.licenciaFuncionamiento')?.value);
    formData.append('fotografia_propietario', this.restauranteForm.get('pasoTres.fotografiaPropietario')?.value);
    formData.append('pais', this.restauranteForm.get('pasoDos.pais')?.value);
    formData.append('departamento', this.restauranteForm.get('pasoDos.departamento')?.value);
    formData.append('numero_mesas', this.restauranteForm.get('pasoTres.numeroMesas')?.value);
    this.restauranteForm.markAllAsTouched();
    if (this.restauranteForm) {
      this.preRegistroService.savePreRegistro(formData).subscribe({
        next: response => {
          console.log('Respuesta del servidor:', response);
          this.toastr.success('Formulario enviado correctamente', 'Éxito');
          this.restauranteForm.reset();
          this.currentStep = 1;
        },
        error: error => {
          console.error('Error al enviar el formulario:', error);
          this.toastr.error('Error al enviar el formulario', 'Error');
        },
        complete: () => {
          console.log('Envio completado');
        }
      });
    } else {
      this.toastr.info('Campos no validos', 'Información');
    }
  }
}
