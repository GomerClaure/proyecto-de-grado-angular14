import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurantName: string = 'Bienvenido a Lugo';
  restauranNameTemp: string = '';
  tiporestaurante: string = '';
  color: string = '';
  imageUrl: string = 'assets/image/img-home/Default.png';
  maxIntentos: number = 5;
  animationClass: string = '';
  titleAnimationClass: string = '';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.intentarRecuperar(0);
  }
  intentarRecuperar(intentosRealizados: number) {
    this.restauranNameTemp = sessionStorage.getItem('nombre_restaurante') || 'Bienvenido a Lugo';
    this.tiporestaurante = sessionStorage.getItem('tipo_establecimiento') || '';

    if ((this.restauranNameTemp === 'Bienvenido a Lugo' || this.tiporestaurante === '') && intentosRealizados < this.maxIntentos) {
      setTimeout(() => {
        this.intentarRecuperar(intentosRealizados + 1);
      }, 1000);
    } else {
      this.setColorAndImage();
      setTimeout(() => {
        this.titleAnimationClass = 'zoom-in';
      }, 100); // Añade un pequeño retraso
    }
  }
  setColorAndImage(): void {
    this.animationClass = 'zoom-out';
    setTimeout(() => {
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
      this.restaurantName = this.restauranNameTemp;
      this.animationClass = 'zoom-in';
      this.cdr.detectChanges();
    }, 800);
  }

}
