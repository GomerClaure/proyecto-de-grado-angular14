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
  guardarCategoria() {
    if (this.formularioCategoria.valid && this.selectedFile) {
      const nombre = this.formularioCategoria.get('nombre')?.value;
  
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('nombre', nombre);
  
      this.categoriaService.saveCategoria(formData).subscribe(
        success => {
          console.log('Categoría guardada exitosamente:', success);
          // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página.
        },
        error => {
          console.error('Error al guardar la categoría:', error);
          // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario.
        }
      );
    } else {
      console.error('Formulario inválido o no se ha seleccionado ninguna imagen.');
      // Aquí puedes manejar el caso en que el formulario no sea válido o no se haya seleccionado ninguna imagen.
    }
  }
}