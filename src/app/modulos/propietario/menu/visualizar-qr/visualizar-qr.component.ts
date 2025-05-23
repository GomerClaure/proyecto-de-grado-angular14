import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Menu } from 'src/app/modelos/Menu';
import { Restaurante } from 'src/app/modelos/Restaurante';
import { MenuService } from 'src/app/services/menu/menu.service';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar-qr.component.html',
  styleUrls: ['./visualizar-qr.component.scss']
})
export class VisualizarQrComponent implements OnInit {
  public cantidadQr: number;
  public menu!: Menu;
  public restaurante!: Restaurante;
  public baseUrl = environment.backendStorageUrl;
  public qrUrl: SafeResourceUrl;


  constructor(private menuService: MenuService, private restauranteService: RestauranteService,
    private router: Router, private sanitizer: DomSanitizer) {
    this.menu = {
      id: 0,
      portada: '',
      tema: '',
      qr: '',
    };
    this.qrUrl = this.sanitizer.bypassSecurityTrustUrl( this.baseUrl + this.menu.qr);
    this.restaurante = {
      id: 0,
      id_menu: 0,
      nombre: '',
      nit: 0,
      latitud: '',
      longitud: '',
      tipo_establecimiento:'',
      telefono: 0,
      correo: '',
      licencia_funcionamiento: '',
    };
    this.cantidadQr = 1;

  }

  ngOnInit(): void {
    this.obtenerMenu();
    this.obtenerRestaurante();
  }

  obtenerMenu() {
    let idRestaurante = sessionStorage.getItem('id_restaurante')||'0';
    this.menuService.getMenu(idRestaurante).subscribe(
      (res: any) => {
        this.menu = res.menu;
        console.log(this.menu)
        if(this.menu.qr){
          this.qrUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.menu.qr);
          this.mostrarElemento('campoImprimirQr');
        }else{
          this.mostrarElemento('btnGenerarQr');
        }
        console.log(this.menu);
      },
      err => {
        console.log(err);
      }
    );
  }

  mostrarElemento(idBoton: string) {
    console.log(idBoton); 
    let boton = document.getElementById(idBoton);
    
    if (boton) {
      boton.style.display = 'block';
    }
  }

  ocultarElemento(idBoton: string) {
    let boton = document.getElementById(idBoton);
    if (boton) {
      boton.style.display = 'none';
    }
  }

  obtenerRestaurante() {
    this.restauranteService.getRestaurante().subscribe(
      (res: any) => {
        console.log(res);
        this.restaurante = res.restaurante;
      },
      err => {
        console.log(err);
      }
    );
  }
  generarQr() {
    let direccionUrlMenu = environment.frontDominio + '/vista/' + this.menu.id;
    this.menuService.generarQr(direccionUrlMenu).subscribe(
      (res: any) => {
        this.menu.qr = res.qr;
        this.qrUrl = this.baseUrl + res.qr;
        this.mostrarElemento('campoImprimirQr');
        this.ocultarElemento('btnGenerarQr');
      },
      err => {
        console.log(err);
      }
    );
  }

  imprimirQr() {
    localStorage.setItem('url_qr', this.baseUrl+this.menu.qr);
    localStorage.setItem('nombre_restaurante', this.restaurante.nombre);
    localStorage.setItem('cantidad_qr', this.cantidadQr.toString());
    this.router.navigate(['propietario/imprimir/qr']);
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/Imagen-rota.jpg';
  }

}
