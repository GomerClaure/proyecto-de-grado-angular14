import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements  OnChanges  {
  public imageUrl: string;
  public imageWidth: number = 380;
  public imageHeight: number = 280;
  private selectedFile: File = new File([''], '');
  public formularioCategoria: FormGroup;
  public backendStorageUrl = environment.backendStorageUrl;
  @Input() categoria: Categoria;  

  constructor(
    private formBuilder: FormBuilder, 
    private categoriaService: CategoriaService,
    private toast: NgToastService,
  ) {
    this.imageUrl = 'assets/image/27002.jpg';
    this.formularioCategoria = this.formBuilder.group({
      nombre: [null, Validators.required],
      imagen: [null],  // Control para la imagen
    });
    
    this.categoria = { id: 0, nombre: '', imagen: '' };
  }

  ngOnChanges(): void {
    this.formularioCategoria.patchValue({
      nombre: this.categoria.nombre
    });
    this.imageUrl = this.backendStorageUrl + this.categoria.imagen;
    this.selectedFile = new File([''], '');
  }

  onImageError(): void {
    this.imageUrl = 'assets/image/Imagen-rota.jpg'; // URL de la imagen de reemplazo
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.formularioCategoria.patchValue({
      imagen: this.selectedFile
    });
    if (this.selectedFile) {
      console.log("Nuevo archivo")
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  guardarCategoria() {
    const datosForm = this.formularioCategoria.value;
    const formData = new FormData();

    if (this.selectedFile.size > 0) {
      formData.append('imagen', this.selectedFile);
    }
    formData.append('nombre', datosForm.nombre);
    
    this.categoriaService.updateCategoria(this.categoria.id, formData).subscribe(
      (response: any) => {
        console.log(response.categoria)
        this.categoriaService.categoriaEvento('editar', response.categoria);
        this.toast.success({ detail: "SUCCESS", summary: 'Categoría guardada', duration: 2000 });
      },
      (error) => {
        this.toast.error({ detail: "ERROR", summary: 'Error al editar categoría', sticky: true });
      }
    );
  }

}
