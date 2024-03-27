import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { environment } from 'src/environments/environment';
import { ModalService } from '../../../../services/modales/modal.service';

@Component({
  selector: 'app-lista-platillo',
  templateUrl: './lista-platillo.component.html',
  styleUrls: ['./lista-platillo.component.scss']
})
export class ListaPlatilloComponent {
  filterPlatillos='';
  platillos: Platillo[] = [];
  storageUrl = environment.backendStorageUrl;
  textoBuscador:string = '';
  constructor(private router: Router, private platilloService: PlatillosService,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getPlatillos();
  }

  editarPlatillo(id: number) {
    this.router.navigate(['lista/editar-platillo'], { queryParams: { platilloId: id } });
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

  eliminarPlatillo(id: number) {
  this.modalService.openModal(id);
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
  }
}
