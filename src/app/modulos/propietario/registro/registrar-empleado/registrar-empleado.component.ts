import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.scss']
})
export class RegistrarEmpleadoComponent implements OnInit {

  formularioEmpleado: FormGroup;
  imagenSeleccionada: File | null = null;
  fileName: string = 'Seleccione un archivo...';

  @ViewChild('fotografiaEmpleado', { static: false }) fotografiaEmpleado!: ElementRef; // Referencia al input de archivo
  
  constructor(private formBuilder: FormBuilder , private toast: NgToastService) {
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
      fechaContratacion: [null, Validators.required],
      fotografiaEmpleado: [null, Validators.required], // Añadir campo para la imagen
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
      this.fileName = file.name;  // Actualiza el nombre del archivo en el input de texto
      this.formularioEmpleado.patchValue({
        fotografiaEmpleado: file  // Añadir el archivo al FormGroup
      });
    }
  }

  onSubmit() {
    if (this.formularioEmpleado.invalid) {
      console.log("form invalido")
      this.toast.info({
        detail: 'Error',
        summary: 'Por favor, complete todos los campos.',
        duration: 2000
      });
      return;
    }
    else if (this.formularioEmpleado.valid) {
      const datosEmpleado = this.formularioEmpleado.value;
      console.log(datosEmpleado);  // Los datos del formulario, incluyendo la imagen
      this.toast.success({
        detail: 'Error',
        summary: 'Empleado registrado.',
        duration: 2000
      });
      this.formularioEmpleado.reset();
      // Limpiar el nombre del archivo mostrado
    this.fileName = 'Seleccione un archivo...';
    this.imagenSeleccionada = null; // Reiniciar la variable de imagen

    // Limpiar el input de archivo
    this.fotografiaEmpleado.nativeElement.value = ''; 
    }
  }
}
 