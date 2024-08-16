import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
=======
>>>>>>> master
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-qr',
  templateUrl: './plantilla-qr.component.html',
  styleUrls: ['./plantilla-qr.component.scss']
})
export class PlantillaQrComponent implements OnInit {
  cantidad_qr: number =1;
<<<<<<< HEAD
  urlQr: SafeResourceUrl;
  nombreRestaurante: string = 'Restaurante';
  constructor(private router: Router,  private sanitizer: DomSanitizer) { 
    this.cantidad_qr = 1;
    this.urlQr = this.sanitizer.bypassSecurityTrustUrl('assets/img/qr.png');
=======
  urlQr: string = 'https://www.qrstuff.com/images/default_qrcode.png';
  nombreRestaurante: string = 'Restaurante';
  constructor(private router: Router) { 
    this.cantidad_qr = 1;
    this.urlQr = 'https://www.qrstuff.com/images/default_qrcode.png';
>>>>>>> master
    this.nombreRestaurante = 'Restaurante';
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.urlQr = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem('url_qr') || 'assets/img/qr.png');
    
=======
    this.urlQr = localStorage.getItem('url_qr') || 'assets/img/qr.png';
>>>>>>> master
    this.cantidad_qr = parseInt(localStorage.getItem('cantidad_qr') || '1');
    this.nombreRestaurante = localStorage.getItem('nombre_restaurante') || 'Restaurante';
    localStorage.removeItem('url_qr');
    localStorage.removeItem('cantidad_qr');
    localStorage.removeItem('nombre_restaurante');
    // espera 1s
<<<<<<< HEAD
    var isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
    if (isMobile) {
      const documento = document.getElementsByClassName('white-window')[0];
      //cambiar estilo a display:block
      documento?.setAttribute('style', 'display:block');
    }else{
      setTimeout(() => {
        this.printQR();
        this.router.navigate(['/menu/qr']);
      }, 1000);
    }
    
=======
    setTimeout(() => {
      this.printQR();
      this.router.navigate(['/menu/qr']);
    }, 1000);
>>>>>>> master

  }
 
  printQR() {
    
    window.print();
  }
}
