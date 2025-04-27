import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistroEmpleadoService } from 'src/app/services/registro-empleado/registro-empleado.service';
import { fileValidator } from 'src/app/validators/file-validator';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.scss']
})
export class RegistrarEmpleadoComponent implements OnInit {

  formularioEmpleado: FormGroup;
  imagenSeleccionada: File | null = null;
  fileName: string = 'Seleccione un archivo...';
  uploadedFile: File | null = null;
  

  @ViewChild('fotografiaEmpleado', { static: false }) fotografiaEmpleado!: ElementRef; // Referencia al input de archivo
  
  constructor(private formBuilder: FormBuilder , 
              private toastr: ToastrService, 
              private empleadoService:RegistroEmpleadoService) {

    this.formularioEmpleado = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellidoPaterno: [null, Validators.required],
      apellidoMaterno: [null, Validators.required],
      fechaNacimiento: [null, [Validators.required, this.validarMayorEdad]], // Validador
      telefono: [null, [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
      carnetIdentidad: [null, Validators.required],
      direccion: [null, Validators.required],
      correoElectronico: [null, [Validators.required, Validators.email]],
      puesto: ['', Validators.required],
      fechaContratacion: [null, [Validators.required, this.validarFechaNoFutura]],
      fotografiaEmpleado: [null, [Validators.required, fileValidator(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], 2)]], // Añadir campo para la imagen
    });
  }

  ngOnInit(): void {}

  validarMayorEdad(control: AbstractControl) {
    const fechaNacimiento = new Date(control.value);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    return edad >= 18 ? null : { menorDeEdad: true };
  }

  // Método que maneja el cambio de archivo
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      this.fileName = file.name;  // Update the display name for the file input
      this.formularioEmpleado.patchValue({
        fotografiaEmpleado: file  // Add the file to the FormGroup

      });
    }
    console.log(this.imagenSeleccionada)
    this.formularioEmpleado.get('fotografiaEmpleado')?.markAsTouched();
    
  }

  onSubmit() {
    if (this.formularioEmpleado.invalid) {
      console.log("form invalido")
      // que errores hay
      console.log(this.formularioEmpleado.errors)
      console.log(this.formularioEmpleado.get('fotografiaEmpleado')?.errors)
      this.formularioEmpleado.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      this.toastr.info('Por favor, complete todos los campos.','Informacion');
      return;
    }
     
    const formData = new FormData();
    formData.append('nombre', this.formularioEmpleado.get('nombre')?.value);
    formData.append('apellido_paterno', this.formularioEmpleado.get('apellidoPaterno')?.value);  
    formData.append('apellido_materno', this.formularioEmpleado.get('apellidoMaterno')?.value);  
    formData.append('fecha_nacimiento', this.formularioEmpleado.get('fechaNacimiento')?.value); 
    formData.append('telefono', this.formularioEmpleado.get('telefono')?.value);
    formData.append('ci', this.formularioEmpleado.get('carnetIdentidad')?.value); 
    formData.append('direccion', this.formularioEmpleado.get('direccion')?.value);
    formData.append('correo', this.formularioEmpleado.get('correoElectronico')?.value); 
    formData.append('fecha_contratacion', this.formularioEmpleado.get('fechaContratacion')?.value); 

    const nickname = this.formularioEmpleado.get('nombre')?.value + this.formularioEmpleado.get('carnetIdentidad')?.value;
    formData.append('nickname', nickname);  
    
    const puesto = this.formularioEmpleado.get('puesto')?.value;
    console.log(puesto)
    let idRol = '';
    if (puesto === 'Cajero') {
        idRol = '2';
        formData.append('id_rol', idRol); 
        console.log (idRol)
    } else if (puesto === 'Mesero') {
        idRol = '1';
        formData.append('id_rol', idRol); 
    } else if (puesto === 'Cocinero') {
        idRol = '3';
        formData.append('id_rol', idRol); 
    } 
  
    
    // Añadir la imagen solo si ha sido seleccionada
    if (this.imagenSeleccionada) {
      console.log(this.imagenSeleccionada)
      formData.append('foto_perfil', this.imagenSeleccionada);

    }
    
    const idPropietario = sessionStorage.getItem('id_usuario');
    if (idPropietario) {
        formData.append('idPropietario', idPropietario); 
    }
    
   
      console.log("lo que captura", formData)

    this.empleadoService.storeEmpleado(formData).subscribe(
      (response:any) => {
        this.toastr.success('Empleado registrado con exito.','Exito');
        this.formularioEmpleado.reset();
        this.fileName = 'Seleccione un archivo...';
        this.imagenSeleccionada = null;
        this.fotografiaEmpleado.nativeElement.value = '';
      },
      (error: any) => {
        console.error('Error al registrar empleado:', error);
        this.toastr.error('Error al registrar empleado.','Informacion');
      }
    );
  }
  validarFechaNoFutura(control: AbstractControl) {
    if (!control.value) {
      return null; 
    }
    const fechaContratacion = new Date(control.value);
    const hoy = new Date();
    fechaContratacion.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
    return fechaContratacion > hoy ? { fechaFutura: true } : null;
  }
}

 