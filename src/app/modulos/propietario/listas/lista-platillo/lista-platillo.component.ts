import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-platillo',
  templateUrl: './lista-platillo.component.html',
  styleUrls: ['./lista-platillo.component.scss']
})
export class ListaPlatilloComponent {

  platillos: Platillo[] = [];	
  storageUrl = environment.backendStorageUrl;
  constructor(private router: Router, private platilloService: PlatillosService) {
  }

  ngOnInit(): void {
    this.getPlatillos();
  }

  editarPlatillo() {
    this.router.navigate(['lista/editar-platillo']);
  }

  getPlatillos() {
    this.platilloService.getPlatillos().subscribe(
      res => {
        this.platillos = res.platillo;
        console.log(this.platillos);
      },
      err => {
        console.log(err);
      }
    );
  }

}
