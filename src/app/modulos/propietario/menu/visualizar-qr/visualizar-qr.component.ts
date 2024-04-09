import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/modelos/Menu';
import { MenuService } from 'src/app/services/menu/menu.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar-qr.component.html',
  styleUrls: ['./visualizar-qr.component.scss']
})
export class VisualizarQrComponent implements OnInit {
  private menu!: Menu;

  constructor(private menuService: MenuService) { 
    this.menu = {id: 0,
      portada: '',
      tema: '',
      qr: '',}
  }

  ngOnInit(): void {
    this.obtenerMenu();
  }

  obtenerMenu() {
    let idMenu = 0;
    this.menuService.getMenu().subscribe(
      (res: any ) => {
        this.menu = res.menu;
      },
      err => {
        console.log(err);
      }
    );
  }
  generarQr() {
    if (this.menu.qr === '') {
      let direccionUrlMenu = environment.frontDominio +'/'+ this.menu.id;
      this.menuService.generarQr(direccionUrlMenu).subscribe(
        (res: any) => {
          this.menu.qr = res.qr;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
