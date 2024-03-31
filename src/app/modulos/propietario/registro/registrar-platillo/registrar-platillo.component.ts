import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';

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

  ngOnInit(): void {
      this.obtenerCategorias();
  }
 
  constructor(private formBuilder: FormBuilder,private platillosService:PlatillosService,private categoriasService:CategoriaService) {
    this.formularioPlatillo = this.formBuilder.group({
      nombre: [null,Validators.required],
      categoria: [null,Validators.required],
      precio: [null, [Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)]],
      descripcion: [null,Validators.required],
      imagen:['']
    });
    this.imageUrl = 'assets/image/27002.jpg';
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

  onSubmit() {
    if (this.formularioPlatillo.valid) {
      // Obtener los valores del formulario
      const datosPlatillo = this.formularioPlatillo.value;
      console.log(datosPlatillo);
      console.log(this.selectedFile);
      this.registrarPlatillo();
      // Aquí puedes agregar la lógica para enviar los datos a través de una solicitud HTTP o realizar cualquier otra acción que desees con los datos.
    }
    else {
      //Formulario Invalido
    }
  }

  registrarPlatillo() {

    if (this.formularioPlatillo.valid) {
      // Obtener los valores del formulario
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
          this.imageUrl = 'assets/image/27002.jpg';
          console.log(success);
        },
        error => {
          console.log(error);
        }
      );

    }
    else {
      //Formulario Invalido
    }
  }

  // Método para obtener las categorías del servicio
  obtenerCategorias() {
    this.categoriasService.getCategorias().subscribe(
      (data: any) => { // Ajusta el tipo de datos esperado
        this.categorias = data.categorias; // Almacena las categorías obtenidas en la variable categorias
        console.log(data)
      },
      error => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }
}
