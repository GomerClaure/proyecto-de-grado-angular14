import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';


@Component({
  selector: 'app-modal-datos-cuenta',
  templateUrl: './modal-datos-cuenta.component.html',
  styleUrls: ['./modal-datos-cuenta.component.scss']
}) 
export class ModalDatosCuentaComponent implements OnInit {

  razonSocial: string = '';
  nit: string = '';
  id_restaurante:number=0;

  constructor(private cuentaS:CuentaService) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
  }
  guardarDatos(){
    const formData= new FormData();
    formData.append('razon_social',this.razonSocial);
    formData.append('nit',this.nit);
    this.cuentaS.storeDatosCuenta(this.id_restaurante, formData).subscribe(
    (response:any) => {
    console.log('Datos registrados', response);
    }, 
    (error:any) => {
    console.error('Error en Datos cuenta', error);
  });
  }
}
