import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-platillo',
  templateUrl: './lista-platillo.component.html',
  styleUrls: ['./lista-platillo.component.scss']
})
export class ListaPlatilloComponent {

  constructor(private router: Router) {}

  Propietario() {
    this.router.navigate(['lista/editar-platillo']); 
    }

}
