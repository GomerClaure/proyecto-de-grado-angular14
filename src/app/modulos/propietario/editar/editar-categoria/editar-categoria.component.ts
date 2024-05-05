import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/modelos/Categoria';
import { ModalEditarCategoriaService } from 'src/app/services/modales/modal-editar-categoria.service';
import { environment } from 'src/environments/environment';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

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
  //idCategoria:string='';

  constructor(private formBuilder: FormBuilder, 
              private modalEditarCategoriaService: ModalEditarCategoriaService,
              private categoriaService:CategoriaService,
              private toast:NgToastService,
              private router:Router
            ) {
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
    
    this.categoriaService.getModalClosed().subscribe(closed => {
        if (closed) {
          console.log('Modal cerrado:', closed);
          // Recargar la lista de categorías
          window.location.reload();
          // Poner modalClosed a false después de recargar la lista de categorías
          this.categoriaService.setModalClosed(false);
        }
      });
  }


  guardarCategoria() {
    let datosForm = this.formularioCategoria.value;
    const formData = new FormData();
    console.log(this.formularioCategoria.value)
    // Verificar si se ha seleccionado un archivo
    if (this.selectedFile.size > 0) {
      formData.append('imagen', this.selectedFile);
      console.log(this.selectedFile)
    }
    formData.append('nombre', datosForm.nombre);
    
    this.categoriaService.updateCategoria(this.categoria.id, formData).subscribe(
      (response) => {
        console.log('Categoría actualizada correctamente', response);
        this.toast.success({detail:"SUCCESS",summary:'Categoria guardada',duration:2000});
        this.router.navigate(['/lista/categoria']);
      },
      (error) => {
        // Manejo de errores
        console.error('Error al actualizar categoría', error);
      }
    );
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
