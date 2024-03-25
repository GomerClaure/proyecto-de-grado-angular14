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
  //imageUrl: any;
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 450; 
  imageHeight: number = 300;
 
  constructor(private formBuilder: FormBuilder) {
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [null,Validators.required],
      categoria: [null,Validators.required],
      precio: [null, [Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)]],
      descripcion: [null,Validators.required],
      imagen:[null,Validators.required]
    });
    this.imageUrl = 'assets/image/27002.jpg';
  }

  // Función para previsualizar la imagen seleccionada
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
