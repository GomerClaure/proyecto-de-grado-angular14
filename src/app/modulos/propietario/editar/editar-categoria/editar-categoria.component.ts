import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/modelos/Categoria';
import { ModalEditarCategoriaService } from 'src/app/services/modales/modal-editar-categoria.service';
import { environment } from 'src/environments/environment';	

declare var $: any;

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
  formularioCategoria: FormGroup;
  categoria: Categoria;
  backendStorageUrl = environment.backendStorageUrl;

  constructor(private formBuilder: FormBuilder, private modalEditarCategoriaService: ModalEditarCategoriaService) {
    this.imageUrl = 'assets/image/27002.jpg';
    this.formularioCategoria = this.formBuilder.group({
      nombre: [null, Validators.required],
      imagen: [null, Validators.required]
    });
    this.categoria = { id: 0, nombre: '', imagen: '' };
  }

  ngOnInit(): void {
    this.categoria = this.modalEditarCategoriaService.getCategoria();
    $('#ModalEditarC').on('shown.bs.modal', () => {
      this.fillFormWithCategoriaData();
    });
  }


  guardarCategoria() {
    console.log(this.categoria);
  }

  fillFormWithCategoriaData() {
    console.log('fillFormWithCategoriaData', this.categoria);
    this.formularioCategoria.patchValue({
      nombre: this.categoria.nombre
    });
    this.imageUrl = this.backendStorageUrl+this.categoria.imagen;
    console.log(this.imageUrl);
    
  }
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
