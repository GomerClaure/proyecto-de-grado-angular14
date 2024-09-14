import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';

@Component({
  selector: 'app-modal-datos-cuenta',
  templateUrl: './modal-datos-cuenta.component.html',
  styleUrls: ['./modal-datos-cuenta.component.scss']
}) 
export class ModalDatosCuentaComponent implements OnInit {

  razonSocial: string = '';
  nit: string = '';
  id_restaurante: number = 0;
  idCuenta: number = 0;  // Variable para almacenar el idCuenta

  constructor(private cuentaS: CuentaService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    // Aquí también puedes obtener el idCuenta si lo tienes en sessionStorage o algún otro lugar.
    this.idCuenta = parseInt(sessionStorage.getItem('idCuenta') || '0');  // O establece el valor correcto
  }

  guardarDatos() {
    const formData = new FormData();
    formData.append('razon_social', this.razonSocial);
    formData.append('nit', this.nit);

    // Asegurarse de que se pasa el idCuenta al servicio
    this.cuentaS.storeDatosCuenta(formData).subscribe(
      (response: any) => {
        console.log('Datos registrados', response);
        this.toast.success({detail:"SUCCESS",summary:'Se registraron los datos correctamente',duration:2000});
        // Limpiar los campos después de un envío exitoso
        this.limpiarCampos();
      },
      (error: any) => {
        console.error('Error en Datos cuenta', error);
        this.toast.error({detail:"ERROR",summary:'Error al registrar datos',duration:1500});
        this.limpiarCampos();
      }
    );
  }
  limpiarCampos() {
    this.razonSocial = '';
    this.nit = '';
  }
}
