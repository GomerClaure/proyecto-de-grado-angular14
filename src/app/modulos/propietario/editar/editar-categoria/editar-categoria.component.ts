import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { uniqueFieldValidator } from 'src/app/validators/unique-field.validator';
import { from } from 'rxjs';

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
  public id_restaurante: any 
  @Input() categoria: Categoria;  

  constructor(
    private formBuilder: FormBuilder, 
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
  ) {
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
    this.formularioCategoria = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      imagen: [null, [Validators.required]],
    });
    
    this.categoria = { id: 0, nombre: '', imagen: '' };
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
  }

  ngOnChanges(): void {
    this.formularioCategoria.patchValue({
      nombre: this.categoria.nombre
    });
    this.imageUrl = this.backendStorageUrl + this.categoria.imagen;
    this.selectedFile = new File([''], '');
  }

  onImageError(): void {
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
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
        this.toastr.success('Categoria editada correctamente','Exito');
      },
      (error) => {
        this.toastr.error('Error al editar categoría', 'Error');
      }
    );
  }

   validarNombreUnico() {
        const control = this.formularioCategoria.get('nombre');
        if (control && control.valid && control.value !== this.categoria.nombre) { // Verifica si el valor es diferente al original no lo borres al refactorizar karis
          const result$ = uniqueFieldValidator(
            this.categoriaService,
            'validarNombre',
            { id_restaurante: this.id_restaurante },
            'nombreNoUnico'
          )(control);
          
          from(result$).subscribe(error => {
            if (error) {
              control.setErrors({ ...control.errors, ...error });
            } else {
              // Elimina solo el error async si estaba presente
              const { nombreNoUnico, ...rest } = control.errors || {};
              control.setErrors(Object.keys(rest).length ? rest : null);
            }
          });
        }
      }

}
