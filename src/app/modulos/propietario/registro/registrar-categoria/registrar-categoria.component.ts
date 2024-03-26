import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent {

  formularioCategoria:FormGroup
  constructor(private formBuilder:FormBuilder) { 
    this.formularioCategoria=this.formBuilder.group({
      nombre:[null,Validators.required]
    })
   }
   guardarCategoria(){
    if(this.formularioCategoria.valid){
      const datoCategoria=this.formularioCategoria.value;
      console.log(datoCategoria);
    }else{
     //Formulario Invalido
    }
   }


}
