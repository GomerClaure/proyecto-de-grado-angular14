import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';	
@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent {

  formularioCategoria:FormGroup
  constructor(private formBuilder:FormBuilder, private categoriaService:CategoriaService) { 
    this.formularioCategoria=this.formBuilder.group({
      nombre:[null,Validators.required]
    })
   }
   guardarCategoria(){
    if(this.formularioCategoria.valid){
      let nombre=this.formularioCategoria.value;
      console.log(nombre);
      this.categoriaService.saveCategoria(nombre).subscribe(
        res=>{
          alert('Categoria Guardada');
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      )
    }else{
     //Formulario Invalido
    }
   }


}
