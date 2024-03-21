import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-platillo',
  templateUrl: './registrar-platillo.component.html',
  styleUrls: ['./registrar-platillo.component.scss']
})
export class RegistrarPlatilloComponent{
  formularioPlatillo: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [''],
      categoria: [''],
      precio: [''],
      descripcion: [''],
      //imagen:['']
    });
  }
  onSubmit() {
    // Obtener los valores del formulario
    const datosPlatillo = this.formularioPlatillo.value;
    console.log(datosPlatillo);
    // Aquí puedes agregar la lógica para enviar los datos a través de una solicitud HTTP o realizar cualquier otra acción que desees con los datos.
  }

}
