import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Categoria } from 'src/app/modelos/Categoria';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';	

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent {
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 380; 
  imageHeight: number = 280;
  formularioCategoria:FormGroup
  selectedFile: File = new File([''], ''); 
  id_restaurante:any;

  constructor(
    private formBuilder:FormBuilder, private categoriaService:CategoriaService ,private toast:NgToastService,private router:Router) { 
    this.formularioCategoria=this.formBuilder.group({
      nombre:[null,Validators.required]
    })
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
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
      formData.append('id_restaurante',this.id_restaurante)
  
      this.categoriaService.saveCategoria(formData).subscribe(
        (data: any) => {
          console.log('Categoría guardada exitosamente:', data);
          this.toast.success({detail:"SUCCESS",summary:'Categoria Registrada',duration:2000})
          this.imageUrl = 'assets/image/27002.jpg';       
          this.formularioCategoria.reset();
          // this.categoriaService.setModalClosed(true);
          this.categoriaService.categoriaEvento('crear', data.categoria)
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
  // clearImage() {
  //   this.imageUrl = 'assets/image/270021.jpg';
  //   this.selectedFile = new File([''], '');
  // }
  // closeModal() {
  //   // Llama a clearImage() cuando se cierra el modal
  //   this.clearImage();
  // }
  onImgError(event: any) {
    event.target.src = 'assets/image/Imagen-rota.jpg';
  }

}