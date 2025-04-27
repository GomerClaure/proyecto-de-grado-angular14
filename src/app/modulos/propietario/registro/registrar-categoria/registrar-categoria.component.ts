import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';	
import { fileValidator } from 'src/app/validators/file-validator';
import { uniqueFieldValidator } from 'src/app/validators/unique-field.validator';

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent implements AfterViewInit,OnDestroy {
  @ViewChild('modalRCategoria') modalElement!: ElementRef;
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 380; 
  imageHeight: number = 280;
  formularioCategoria:FormGroup
  selectedFile: File ; 
  id_restaurante:any;

  constructor(private formBuilder:FormBuilder, 
              private categoriaService:CategoriaService ,
              private toastr:ToastrService,
              ) { 
    this.formularioCategoria=this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      imagen:[null,[Validators.required, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]]
      //imagen: [null,[Validators.required]]
    })
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
    this.selectedFile = new File([''], '');
   }

   ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.limpiarModal();
      });
    } else {
      console.warn("modalElement is undefined");
    }
  }
  
   ngOnDestroy(): void {
    this.limpiarModal();
   }

   onFileSelected(event: any) {
    const file = event.target.files[0];
    const control = this.formularioCategoria.get('imagen');
  
    if (file && control) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
  
      // Validaciones manuales
      const maxSizeMB = 2;
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  
      if (!validTypes.includes(file.type)) {
        control.setErrors({ fileType: true });
      } else if (file.size > maxSizeMB * 1024 * 1024) {
        control.setErrors({ fileSize: true });
      } else {
        control.setErrors(null); // Sin errores
      }
  
      control.markAsTouched();
    }
  }
  
  guardarCategoria() {
    console.log('Es Valido:', this.formularioCategoria.valid);
    // cual es el error del formulario
    Object.keys(this.formularioCategoria.controls).forEach(controlName => {
      const control = this.formularioCategoria.get(controlName);
      if (control && control.invalid) {
        console.log(`Errores en '${controlName}':`, control.errors);
      }
    });
    console.log('Imagen:', this.selectedFile);
    if (this.formularioCategoria.valid && this.selectedFile) {
      const nombre = this.formularioCategoria.get('nombre')?.value;
  
      const formData = new FormData();
      this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');

      formData.append('imagen', this.selectedFile);
      formData.append('nombre', nombre);
      formData.append('id_restaurante',this.id_restaurante)
  
      this.categoriaService.saveCategoria(formData).subscribe(
        (data: any) => {
          console.log('Categoría guardada exitosamente:', data);
          this.toastr.success('Categoria registrada correctamente','Exito')
          this.imageUrl = 'assets/image/Imagen-rota.jpg';       
          this.formularioCategoria.reset();
          this.categoriaService.categoriaEvento('crear', data.categoria)
        },
        error => {
          console.error('Error al guardar la categoría:', error);
          this.toastr.error('Error al registrar la categoria','Error')
        }
      );
    } else {
      console.error('Formulario inválido o no se ha seleccionado ninguna imagen.');
      this.toastr.info('Formulario vacio','Informacion');
    }
  }

  limpiarModal() {
    this.selectedFile = new File([''], '');
    this.formularioCategoria.reset();
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
  }
  onImgError(event: any) {
    event.target.src = 'assets/image/Imagen-rota.jpg';
  }
  validarNombreUnico() {
      const control = this.formularioCategoria.get('nombre');
      if (control && control.valid) {
        const result$ = uniqueFieldValidator(this.categoriaService, 'validarNombre',
          { id_restaurante: this.id_restaurante }, 'nombreNoUnico')(control);
  
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