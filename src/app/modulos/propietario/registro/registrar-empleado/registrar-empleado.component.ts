import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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
      nombre: [null,Validators.required],
      apellidoPaterno: [null,Validators.required],
      apellidoMaterno: [null,Validators.required],
      fechaNacimiento:[null,Validators.required],
      telefono:[null,Validators.required],
      carnetIdentidad:[null,Validators.required],
      direccion:[null,Validators.required],
      correoElectronico:[null,Validators.required],
      puesto: ['', Validators.required],
      fechaContratacion:[null,Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.formularioEmpleado.valid){
        const datosEmpleado=this.formularioEmpleado.value;
        console.log(datosEmpleado)
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
    }}
}
