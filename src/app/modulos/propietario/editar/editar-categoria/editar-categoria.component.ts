import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 350; 
  imageHeight: number = 250;
  selectedFile: File = new File([''], ''); 

  constructor() { 
    this.imageUrl = 'assets/image/27002.jpg';
  }


  ngOnInit(): void {
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

}
