import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurantName: string = '';
  tiporestaurante: string = '';

  constructor() { }

  ngOnInit(): void {
    this.restaurantName = sessionStorage.getItem('nombre_restaurante')||"restaurante";
    this.tiporestaurante = sessionStorage.getItem('tipo_establecimiento')||'defecto';
  }

}
