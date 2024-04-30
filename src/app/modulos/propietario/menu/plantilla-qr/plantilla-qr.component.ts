import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-qr',
  templateUrl: './plantilla-qr.component.html',
  styleUrls: ['./plantilla-qr.component.scss']
})
export class PlantillaQrComponent implements OnInit {
  cantidad_qr: number =1;
  urlQr: string = 'https://www.qrstuff.com/images/default_qrcode.png';
  nombreRestaurante: string = 'Restaurante';
  constructor(private router: Router) { 
    this.cantidad_qr = 1;
    this.urlQr = 'https://www.qrstuff.com/images/default_qrcode.png';
    this.nombreRestaurante = 'Restaurante';
  }

  ngOnInit(): void {
    this.urlQr = localStorage.getItem('url_qr') || 'assets/img/qr.png';
    this.cantidad_qr = parseInt(localStorage.getItem('cantidad_qr') || '1');
    this.nombreRestaurante = localStorage.getItem('nombre_restaurante') || 'Restaurante';
    localStorage.removeItem('url_qr');
    localStorage.removeItem('cantidad_qr');
    localStorage.removeItem('nombre_restaurante');
    // espera 1s
    setTimeout(() => {
      this.printQR();
      this.router.navigate(['/menu/qr']);
    }, 1000);

  }
 
  printQR() {
    
    window.print();
  }
}