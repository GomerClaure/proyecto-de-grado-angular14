import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { RegistrarPlatilloComponent } from '../../registro/registrar-platillo/registrar-platillo.component';
import { environment } from 'src/environments/environment';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { fileValidator } from 'src/app/validators/file-validator';
import { uniqueFieldValidator } from 'src/app/validators/unique-field.validator';
import { from } from 'rxjs';

@Component({
  selector: 'app-editar-platillo',
  templateUrl: './editar-platillo.component.html',
  styleUrls: ['./editar-platillo.component.scss']
})
export class EditarPlatilloComponent implements OnInit {
  static numbersOnlyOneToFour = '^(?:[1-9]\\d{0,2}|1000)$';
  idPlatillo: string = '';
  platillo: Platillo = {} as Platillo;
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 450;
  imageHeight: number = 300;
  selectedFile: File = new File([''], '');
  formularioEditarPlatillo: FormGroup;
  categorias: any[] = [];
  id_restaurante:any;
  defaultImageUrl: string = 'assets/image/Imagen-rota.jpg';

  constructor(private activatedRoute: ActivatedRoute,
              private platilloservice: PlatillosService, 
              private formBuilder: FormBuilder,
              private toastr:ToastrService,
              private categoriaService:CategoriaService
            ) {
    this.formularioEditarPlatillo = this.formBuilder.group({
      nombre: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      categoria: [null, Validators.required],
      precio: [null, [Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyOneToFour)]],
      descripcion: [null, Validators.required],
      imagen: [null, [fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]],
    });
    this.imageUrl = 'assets/image/Imagen-rota.jpg';
  }

  ngOnInit(): void {
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
    this.getCategorias();
    this.activatedRoute.queryParams.subscribe(params => {
      this.idPlatillo = params['platilloId'];
      this.platilloservice.showPlatillo(parseInt(this.idPlatillo)).subscribe(
        res => {
          this.platillo = res.platillo;
          this.fillFormWithPlatilloData();
          console.log(this.platillo);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getCategorias() {
    this.categoriaService.getCategorias(this.id_restaurante).subscribe(
      (data: any) => {
        this.categorias = [...data.categorias];
      },
      error => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      this.selectedFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      this.formularioEditarPlatillo.patchValue({
        imagen: file
      });
      
      this.formularioEditarPlatillo.get('imagen')?.markAsTouched();
    }
  }

  fillFormWithPlatilloData() {
    this.formularioEditarPlatillo.patchValue({
      nombre: this.platillo.nombre,
      precio: this.platillo.precio,
      descripcion: this.platillo.descripcion,
      categoria: this.platillo.categoria.id
    });
    this.imageUrl = environment.backendStorageUrl + this.platillo.imagen;
  }

  registrarPlatillo() {
    if (this.formularioEditarPlatillo.valid) {
      
      let datosForm = this.formularioEditarPlatillo.value;
      console.log(datosForm);
      const formData = new FormData();
      if (this.selectedFile.name != '') {
        formData.append('imagen', this.selectedFile);
      }
      formData.append('imagen', this.selectedFile);
      formData.append('nombre', datosForm.nombre);
      formData.append('id_categoria', datosForm.categoria);
      formData.append('precio', datosForm.precio);
      formData.append('descripcion', datosForm.descripcion);
      this.platilloservice.updatePlatillo(formData, parseInt(this.idPlatillo)).subscribe(
        success => {
          console.log(success);
          this.toastr.success('Se edito el producto correctamente','Exito')
        },
        error => {
          console.log(error);
          this.toastr.error('Error al editar','Error')
        }
      );

    }
    else {
      this.toastr.error('Error al editar','Error')
    }
  }

  onImageError() {
  this.imageUrl = this.defaultImageUrl;
  }

  validarNombreUnico() {
      const control = this.formularioEditarPlatillo.get('nombre');
      if (control && control.valid && control.value !== this.platillo.nombre) { // Verifica si el valor es diferente al original no lo borres al refactorizar karis
        const result$ = uniqueFieldValidator(
          this.platilloservice,
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
 