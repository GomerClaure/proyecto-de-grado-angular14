import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';

@Component({
  selector: 'app-modal-datos-cuenta',
  templateUrl: './modal-datos-cuenta.component.html',
  styleUrls: ['./modal-datos-cuenta.component.scss']
})
export class ModalDatosCuentaComponent implements OnInit {
  
  cuentaForm: FormGroup;  // Form group for validation
  id_restaurante: number = 0;
  @Input() idCuenta: number = 0;

  constructor(
    private fb: FormBuilder,  // FormBuilder for creating form groups
    private cuentaS: CuentaService,
    private toastr: ToastrService
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
      this.toastr.info('No lleno ninguno de los campos','Información');
      return;
    }
    if(this.cuentaS.idCuentaValue == null){
      this.toastr.info('Espere un momeno, datos procesando...','Información');
    }else{
      const formData = new FormData();
      formData.append('razon_social', this.cuentaForm.get('razonSocial')?.value);
      formData.append('nit', this.cuentaForm.get('nit')?.value);
  
      //this.cuentaS.saveId(this.idCuenta);
      // Make sure to pass idCuenta to the service
      this.cuentaS.storeDatosCuenta(formData).subscribe(
        (response: any) => {
          console.log('Datos registrados', response);
          this.toastr.success('Los datos se registraron correctamente','Exito');
          this.limpiarCampos();
        },
        (error: any) => {
          console.error('Error en Datos cuenta', error);
          this.toastr.error('Los datos no fueron almacenados','Error');
          this.limpiarCampos();
        }
      );
    }
  }

  limpiarCampos() {
    this.cuentaForm.reset();
  }
}
