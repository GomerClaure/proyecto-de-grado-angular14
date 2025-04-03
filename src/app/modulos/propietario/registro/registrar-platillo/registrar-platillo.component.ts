import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { ToastrService } from 'ngx-toastr';

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
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
      this.obtenerCategorias();
  }
 
  constructor(private formBuilder: FormBuilder,
              private platillosService:PlatillosService,
              private categoriasService:CategoriaService,
              private toastr:ToastrService
            ) {
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [null,Validators.required],
      categoria: [null,Validators.required],
      precio: [null, [Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)]],
      descripcion: [null,Validators.required],
      imagen:['']
    });
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
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
}
