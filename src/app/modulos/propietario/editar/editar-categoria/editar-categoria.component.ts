import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/modelos/Categoria';
import { ModalEditarCategoriaService } from 'src/app/services/modales/modal-editar-categoria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  public imageUrl: string;
  public imageWidth: number = 350;
  public imageHeight: number = 250;
  private selectedFile: File = new File([''], '');
  public formularioCategoria: FormGroup;
  private categoria: Categoria;
  public backendStorageUrl = environment.backendStorageUrl;

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
    let modal = document.getElementById('ModalEditarC');
    // Si el modal existe, se agrega un listener para el evento 'shown.bs.modal'
    if (modal)  modal.addEventListener('shown.bs.modal', () => {
        this.fillFormWithCategoriaData();
      });
    // Se agrega un listener para el evento 'hidden.bs.modal' y se borra el contenido del input file
    //si no se hace esto, al cerrar el modal y volver a abrirlo, la imagen previamente seleccionada se sigue mostrando
    if (modal) modal.addEventListener('hidden.bs.modal', () => {
        this.formularioCategoria.reset();
        this.selectedFile = new File([''], '');
      });
    // Se agrega un listener al input file para el evento 'change', directamente desde el html
    // con el atributo (change)="onFileSelected($event)" no se puede acceder al evento
    let inputFile = document.getElementById('archivo');
    if (inputFile) inputFile.addEventListener('change', (e) => {
        this.onFileSelected(e);
      });
  }


  guardarCategoria() {
    console.log(this.formularioCategoria.value.nombre);
    if ( this.selectedFile.size > 0 ) {
      console.log('Imagen seleccionada');
      console.log(this.selectedFile);
    }
  }

  fillFormWithCategoriaData() {
    this.formularioCategoria.get('nombre')?.setValue(this.categoria.nombre);
    this.imageUrl = this.backendStorageUrl + this.categoria.imagen;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
