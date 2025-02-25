import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-qr',
  templateUrl: './plantilla-qr.component.html',
  styleUrls: ['./plantilla-qr.component.scss']
})
export class PlantillaQrComponent implements OnInit {
  cantidad_qr: number =1;
  urlQr: SafeResourceUrl;
  nombreRestaurante: string = 'Restaurante';
  constructor(private router: Router,  private sanitizer: DomSanitizer) { 
    this.cantidad_qr = 1;
    this.urlQr = this.sanitizer.bypassSecurityTrustUrl('assets/img/qr.png');
    this.nombreRestaurante = 'Restaurante';
  }

  ngOnInit(): void {
    this.urlQr = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem('url_qr') || 'assets/img/qr.png');
    
    this.cantidad_qr = parseInt(localStorage.getItem('cantidad_qr') || '1');
    this.nombreRestaurante = localStorage.getItem('nombre_restaurante') || 'Restaurante';
    localStorage.removeItem('url_qr');
    localStorage.removeItem('cantidad_qr');
    localStorage.removeItem('nombre_restaurante');
    // espera 1s
    var isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
    if (isMobile) {
      const documento = document.getElementsByClassName('white-window')[0];
      //cambiar estilo a display:block
      documento?.setAttribute('style', 'display:block');
    }else{
      setTimeout(() => {
        this.printQR();
        this.router.navigate(['/propietario/qr']);
      }, 1000);
    }


  }
 
  printQR() {
    window.print();
  }
}
