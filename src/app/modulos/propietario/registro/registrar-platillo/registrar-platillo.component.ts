import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';

@Component({
  selector: 'app-registrar-platillo',
  templateUrl: './registrar-platillo.component.html',
  styleUrls: ['./registrar-platillo.component.scss']
})
export class RegistrarPlatilloComponent {
  formularioPlatillo: FormGroup;
  static numbersOnlyPattern: RegExp = /^[0-9]*$/;

  constructor(private formBuilder: FormBuilder, private platillosService: PlatillosService) {
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      precio: [null, Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)],
      descripcion: [null, Validators.required],
      imagen: [null, Validators.required]
    });
  }
  onSubmit() {
    if (this.formularioPlatillo.valid) {
      // Obtener los valores del formulario
      const datosPlatillo = this.formularioPlatillo.value;
      console.log(datosPlatillo);
      // Aquí puedes agregar la lógica para enviar los datos a través de una solicitud HTTP o realizar cualquier otra acción que desees con los datos.
    }
    else {
      //Formulario Invalido
    }
  }

  registrarPlatillo() {

    if (this.formularioPlatillo.valid) {
      // Obtener los valores del formulario
      let id_restaurante = sessionStorage.getItem('id_restaurante')||'';
      let datosForm = this.formularioPlatillo.value;
      console.log(datosForm);
      const formData = new FormData();
      formData.append('imagen', datosForm.imagen);
      formData.append('nombre', datosForm.nombre);
      formData.append('id_categoria', datosForm.categoria);
      formData.append('precio', datosForm.precio);
      formData.append('descripcion', datosForm.descripcion);
      formData.append('id_restaurante', id_restaurante);
      this.platillosService.storePlatillo(formData).subscribe(
        success => {
          console.log(success);
        },
        error => {
          console.log(error);
        }
      );

    }
    else {
      //Formulario Invalido
    }
  }


}
