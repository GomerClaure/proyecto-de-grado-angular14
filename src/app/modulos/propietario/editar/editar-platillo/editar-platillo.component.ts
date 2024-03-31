import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { RegistrarPlatilloComponent } from '../../registro/registrar-platillo/registrar-platillo.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-platillo',
  templateUrl: './editar-platillo.component.html',
  styleUrls: ['./editar-platillo.component.scss']
})
export class EditarPlatilloComponent implements OnInit {
  idPlatillo: string = '';
  platillo: Platillo = {} as Platillo;
  imageUrl: string | ArrayBuffer | null;
  imageWidth: number = 450;
  imageHeight: number = 300;
  selectedFile: File = new File([''], '');
  formularioEditarPlatillo: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private platilloservice: PlatillosService, private formBuilder: FormBuilder) {
    this.imageUrl = 'assets/image/27002.jpg';
    this.formularioEditarPlatillo = this.formBuilder.group({
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      precio: [null, [Validators.required, Validators.pattern(RegistrarPlatilloComponent.numbersOnlyPattern)]],
      descripcion: [null, Validators.required],
      imagen: ['']
    });
  }

  ngOnInit(): void {
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

  fillFormWithPlatilloData() {
    // Llenar el formulario con los datos del platillo
    this.formularioEditarPlatillo.patchValue({
      nombre: this.platillo.nombre,
      // categoria: this.platillo.categoria.nombre,
      precio: this.platillo.precio,
      descripcion: this.platillo.descripcion
    });
    this.imageUrl = environment.backendStorageUrl + this.platillo.imagen;
  }
  registrarPlatillo() {

    if (this.formularioEditarPlatillo.valid) {
      // Obtener los valores del formulario
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
}
 