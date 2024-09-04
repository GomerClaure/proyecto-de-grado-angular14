import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';


@Component({
  selector: 'app-modal-datos-cuenta',
  templateUrl: './modal-datos-cuenta.component.html',
  styleUrls: ['./modal-datos-cuenta.component.scss']
}) 
export class ModalDatosCuentaComponent implements OnInit {

  razonSocial: string = '';
  nit: string = '';

  constructor(private cuentaService:CuentaService) { }

  ngOnInit(): void {
  }
  guardarDatos(){
    console.log('Razón Social:', this.razonSocial);
    console.log('NIT:', this.nit);
    this.cuentaService.saveDatos(this.razonSocial,this.nit);
  }
}
