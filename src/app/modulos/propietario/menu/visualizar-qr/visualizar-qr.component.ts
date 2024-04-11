import { Component, OnInit } from '@angular/core';
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
  public menu!: Menu;
  public restaurante!: Restaurante;
  public baseUrl = environment.backendStorageUrl;


  constructor(private menuService: MenuService, private restauranteService: RestauranteService) {
    this.menu = {
      id: 0,
      portada: '',
      tema: '',
      qr: '',
    };
    this.restaurante = {
      id: 0,
      id_menu: 0,
      nombre: '',
      nit: 0,
      direccion: '',
      telefono: 0,
      correo: '',
      licencia_funcionamiento: '',
    };

  }

  ngOnInit(): void {
    this.obtenerMenu();
    this.obtenerRestaurante();
  }

  obtenerMenu() {
    let idMenu = 0;
    this.menuService.getMenu().subscribe(
      (res: any) => {
        this.menu = res.menu;
        if(this.menu.qr){
          this.mostrarBoton('btnImprimirQr');
        }else{
          this.mostrarBoton('btnGenerarQr');
        }
        console.log(this.menu);
      },
      err => {
        console.log(err);
      }
    );
  }

  mostrarBoton(idBoton: string) {
    let boton = document.getElementById(idBoton);
    if (boton) {
      boton.style.display = 'block';
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
    let direccionUrlMenu = environment.frontDominio + '/menu/' + this.menu.id;
    this.menuService.generarQr(direccionUrlMenu).subscribe(
      (res: any) => {
        this.menu.qr = res.qr;
      },
      err => {
        console.log(err);
      }
    );
  }

  imprimirQr() {
    window.print();
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/27002.jpg';
  }

}
