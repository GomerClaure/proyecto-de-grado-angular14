import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-platillo',
  templateUrl: './registrar-platillo.component.html',
  styleUrls: ['./registrar-platillo.component.scss']
})
export class RegistrarPlatilloComponent{
  formularioPlatillo: FormGroup;
  static numbersOnlyPattern: RegExp = /^[0-9]*$/;
 
  constructor(private formBuilder: FormBuilder) {
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [null,Validators.required],
      categoria: [null,Validators.required],
      precio: [null,Validators.required,Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)],
      descripcion: [null,Validators.required],
      imagen:[null,Validators.required]
    });
  }
  onSubmit() {
    if(this.formularioPlatillo.valid){
      // Obtener los valores del formulario
    const datosPlatillo = this.formularioPlatillo.value;
    console.log(datosPlatillo);
    // Aquí puedes agregar la lógica para enviar los datos a través de una solicitud HTTP o realizar cualquier otra acción que desees con los datos.
    }
    else{
      //Formulario Invalido
    }
  }

}
