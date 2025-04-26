import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { fileValidator } from 'src/app/validators/file-validator';
import { uniqueFieldValidator } from 'src/app/validators/unique-field.validator';
import { from } from 'rxjs';

@Component({
  selector: 'app-registrar-platillo',
  templateUrl: './registrar-platillo.component.html',
  styleUrls: ['./registrar-platillo.component.scss']
})
export class RegistrarPlatilloComponent implements OnInit{
  formularioPlatillo: FormGroup;
  static numbersOnlyPattern: RegExp = /^[0-9]*$/;
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 450; 
  imageHeight: number = 300;
  selectedFile: File = new File([''], ''); 
  categorias:any[]=[];
  id_restaurante:any;

  ngOnInit(): void {   
      this.obtenerCategorias();
  }
 
  constructor(private formBuilder: FormBuilder,
              private platillosService:PlatillosService,
              private categoriasService:CategoriaService,
              private toastr:ToastrService
            ) {
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      categoria: [null,Validators.required],
      precio: [null, [Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)]],
      descripcion: [null,Validators.required],
      imagen: [null, [Validators.required, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]],
    });
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      this.formularioPlatillo.patchValue({
        imagen: file
      });
      
      this.formularioPlatillo.get('imagen')?.markAsTouched();
    }
  }

  onSubmit() {
    if (this.formularioPlatillo.valid) {
      const datosPlatillo = this.formularioPlatillo.value;
      console.log(datosPlatillo);
      console.log(this.selectedFile);
      this.registrarPlatillo();
    }
    else {
      console.log('Formulario inválido');
      this.formularioPlatillo.markAllAsTouched();
    }
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/Imagen-rota.jpg';
  }

  registrarPlatillo() {

    if (this.formularioPlatillo.valid) {
      let id_restaurante = sessionStorage.getItem('id_restaurante')||'';
      let datosForm = this.formularioPlatillo.value;
      console.log(datosForm);
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('nombre', datosForm.nombre);
      formData.append('id_categoria', datosForm.categoria);
      formData.append('precio', datosForm.precio);
      formData.append('descripcion', datosForm.descripcion);
      formData.append('id_restaurante', id_restaurante);
      this.platillosService.storePlatillo(formData).subscribe(
        success => {
          this.formularioPlatillo.reset();
         this.imageUrl = 'assets/image/Imagen-rota.jpg'
          console.log(success);
          this.toastr.success('Producto Registrado con exito','Exito')
        },
        error => {
          console.log(error);
          this.toastr.error('Error al registrar platillo','Error')
        }
      );

    }
    else {
     
    }
  }

  obtenerCategorias() {
    this.categoriasService.getCategorias(this.id_restaurante).subscribe(
      (data: any) => { 
        this.categorias = data.categorias;
        console.log(data)
      },
      error => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }
  validarNombreUnico() {
    const control = this.formularioPlatillo.get('nombre');
    if (control && control.valid) {
      const result$ = uniqueFieldValidator(
        this.platillosService,
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
