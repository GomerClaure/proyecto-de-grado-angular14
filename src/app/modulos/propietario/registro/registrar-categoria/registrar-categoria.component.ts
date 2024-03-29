import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';	
@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent {
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 350; 
  imageHeight: number = 250;
  formularioCategoria:FormGroup
  selectedFile: File = new File([''], ''); 

  constructor(private formBuilder:FormBuilder, private categoriaService:CategoriaService) { 
    this.formularioCategoria=this.formBuilder.group({
      nombre:[null,Validators.required]
    })
    this.imageUrl = 'assets/image/27002.jpg';
   }

     // Función para previsualizar la imagen seleccionada
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
   guardarCategoria(){
    if(this.formularioCategoria.valid){
      let nombre=this.formularioCategoria.value;

      console.log(nombre);
      console.log(this.imageUrl);
      this.categoriaService.saveCategoria(nombre).subscribe(
        res=>{
          alert('Categoria Guardada');
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      )
      this.imageUrl='assets/image/27002.jpg';
    }else{
     //Formulario Invalido
    }
   }


}
