import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';

@Component({
  selector: 'app-modal-datos-cuenta',
  templateUrl: './modal-datos-cuenta.component.html',
  styleUrls: ['./modal-datos-cuenta.component.scss']
})
export class ModalDatosCuentaComponent implements OnInit {
  
  cuentaForm: FormGroup;  // Form group for validation
  id_restaurante: number = 0;
  idCuenta: number = 0;

  constructor(
    private fb: FormBuilder,  // FormBuilder for creating form groups
    private cuentaS: CuentaService,
    private toast: NgToastService
  ) { 
      // Initialize the form with validations
      this.cuentaForm = this.fb.group({
        razonSocial: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.minLength(2), Validators.maxLength(100)]],
        nit: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(5), Validators.maxLength(15)]]
      });
  }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.idCuenta = parseInt(sessionStorage.getItem('idCuenta') || '0');

  }

  guardarDatos() {
    if (this.cuentaForm.invalid) {
      this.toast.error({ detail: "ERROR", summary: 'Por favor, corrija los errores en el formulario', duration: 2000 });
      return;
    }

    const formData = new FormData();
    formData.append('razon_social', this.cuentaForm.get('razonSocial')?.value);
    formData.append('nit', this.cuentaForm.get('nit')?.value);

    // Make sure to pass idCuenta to the service
    this.cuentaS.storeDatosCuenta(formData).subscribe(
      (response: any) => {
        console.log('Datos registrados', response);
        this.toast.success({ detail: "SUCCESS", summary: 'Se registraron los datos correctamente', duration: 2000 });
        this.limpiarCampos();
      },
      (error: any) => {
        console.error('Error en Datos cuenta', error);
        this.toast.error({ detail: "ERROR", summary: 'Error al registrar datos', duration: 1500 });
        this.limpiarCampos();
      }
    );
  }

  limpiarCampos() {
    this.cuentaForm.reset();
  }
}
