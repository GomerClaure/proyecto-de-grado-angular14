import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';	

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
      nombre:[null,Validators.required]
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

}