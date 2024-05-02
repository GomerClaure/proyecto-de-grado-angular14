import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(private formBuilder:FormBuilder, private categoriaService:CategoriaService ,private toast:NgToastService) { 
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
  guardarCategoria() {
    if (this.formularioCategoria.valid && this.selectedFile) {
      const nombre = this.formularioCategoria.get('nombre')?.value;
  
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('nombre', nombre);
  
      this.categoriaService.saveCategoria(formData).subscribe(
        success => {
          console.log('Categoría guardada exitosamente:', success);
          this.toast.success({detail:"SUCCESS",summary:'Categoria Registrada',duration:2000})
          this.imageUrl = 'assets/image/27002.jpg';       
          this.formularioCategoria.reset();
        },
        error => {
          console.error('Error al guardar la categoría:', error);
          this.toast.error({detail:"ERROR",summary:'Error al registrar la categoria',sticky:true})
        }
      );
    } else {
      console.error('Formulario inválido o no se ha seleccionado ninguna imagen.');
      this.toast.info({detail:"INFO",summary:'Formulario invalido',sticky:true});
    }
  }
}