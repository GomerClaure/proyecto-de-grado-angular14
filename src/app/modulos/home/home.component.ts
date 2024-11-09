import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurantName: string = '';
  tiporestaurante: string = '';
  color: string = '';
  imageUrl: string = '';
  maxIntentos: number = 5;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.intentarRecuperar(0);
  }
  intentarRecuperar(intentosRealizados: number) {
    this.restaurantName = sessionStorage.getItem('nombre_restaurante') || 'Restaurante';
    this.tiporestaurante = sessionStorage.getItem('tipo_establecimiento') || '';

    if ((this.restaurantName === 'Restaurante' || this.tiporestaurante === '') && intentosRealizados < this.maxIntentos) {
      setTimeout(() => {
        this.intentarRecuperar(intentosRealizados + 1);
      }, 1000);
    } else {
      this.setColorAndImage();
      this.cdr.detectChanges();
    }
  }
  setColorAndImage(): void {
    switch (this.tiporestaurante.toLowerCase()) {
      case 'restaurante':
        this.color = '#58d68d';
        this.imageUrl = 'assets/image/img-home/Restaurante.png';
        break;
      case 'cafeteria':
        this.color = '#6e2c00';
        this.imageUrl = 'assets/image/img-home/Cafeteria.png.png';
        break;
      case 'bar':
        this.color = '#f1948a';
        this.imageUrl = 'assets/image/img-home/Bar.png';
        break;
      case 'pasteleria':
        this.color = '#a569bd';
        this.imageUrl = 'assets/image/img-home/Pasteleria.png';
        break;
      case 'pizzeria':
        this.color = '#c0392b';
        this.imageUrl = 'assets/image/img-home/Pizzeria.png';
        break;
      case 'comida rapida':
        this.color = '#d4ac0d';
        this.imageUrl = 'assets/image/img-home/Comida-rapida.png';
        break;
      case 'heladeria':
        this.color = '#117a65';
        this.imageUrl = 'assets/image/img-home/Heladeria.png';
        break;
      default:
        this.color = '#2e4053';
        this.imageUrl = 'assets/image/img-home/Default.png';
        break;
    }
  }
}
