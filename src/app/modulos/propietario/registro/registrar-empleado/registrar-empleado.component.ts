import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.scss']
})
export class RegistrarEmpleadoComponent implements OnInit {

  formularioEmpleado: FormGroup;
  selectedPuestos: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formularioEmpleado = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellidoPaterno: [null, Validators.required],
      apellidoMaterno: [null, Validators.required],
      fechaNacimiento: [null, [Validators.required, this.validarMayorEdad]], // Añadido validador
      telefono: [null, [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]], // Ajusta el patrón según tus requisitos
      carnetIdentidad: [null, Validators.required],
      direccion: [null, Validators.required],
      correoElectronico: [null, [Validators.required, Validators.email]],
      puesto: ['', Validators.required],
      fechaContratacion: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  // Validador personalizado para comprobar si la fecha de nacimiento indica que el empleado es mayor de 17 años
  validarMayorEdad(control: AbstractControl) {
    const fechaNacimiento = new Date(control.value);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    const esMayorDeEdad = edad > 17 || (edad === 17 && new Date() >= fechaNacimiento);

    return esMayorDeEdad ? null : { menorDeEdad: true };
  }

  onSubmit() {
    if (this.formularioEmpleado.valid) {
      const datosEmpleado = this.formularioEmpleado.value;
      console.log(datosEmpleado);
    }
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedPuestos.push(value);
    } else {
      const index = this.selectedPuestos.indexOf(value);
      if (index > -1) {
        this.selectedPuestos.splice(index, 1);
      }
    }
  }
}
