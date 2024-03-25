import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-platillo',
  templateUrl: './editar-platillo.component.html',
  styleUrls: ['./editar-platillo.component.scss']
})
export class EditarPlatilloComponent {
  formularioEditarPlatillo:FormGroup;
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 450; 
  imageHeight: number = 300;
  constructor(private formBuilder:FormBuilder) { 

    this.imageUrl = 'assets/image/27002.jpg';
    this.formularioEditarPlatillo = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen:['']
    }); 
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
}
