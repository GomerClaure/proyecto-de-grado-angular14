import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/modelos/Mesa';
import { MesaService } from 'src/app/services/mesas/mesa.service';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.scss']
})
export class ListaMesasComponent implements OnInit {
  mesaSeleccionada: string = '';
  mesas: Mesa[]

  constructor(private router:Router, private mesaService: MesaService) {
    this.mesas = [];
   }

  ngOnInit(): void {
    let idRestaurante = sessionStorage.getItem('id_restaurante')||'0';
    this.mesaService.getMesas(idRestaurante).subscribe(
      (res: any) => {
        this.mesas = res.mesas.slice(1);
        console.log(this.mesas);
      },
      err => {
        console.log(err);
      }
    );
  }

  RegistrarMesa(mesaSeleccionada:string){
    this.router.navigate(['mesero/registrar-pedido'],{queryParams:{mesaSeleccionada:mesaSeleccionada}});
  }
  seleccionarMesa(id: any,nombreMesa:string) {
    // Deseleccionamos todas las mesas
    this.mesaSeleccionada=id;
    const mesas = document.querySelectorAll('.card');
    mesas.forEach(mesa => {
      mesa.classList.remove('selected-card');
    });
    
    // Seleccionamos la mesa clicada si existe
    const mesaSeleccionada = document.getElementById(id);
    if (mesaSeleccionada) {
      mesaSeleccionada.classList.add('selected-card');
    }
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    sleep(1000)
    this.router.navigate(['mesero/registrar-pedido'],{queryParams:{mesaSeleccionada:id,nombreMesa:nombreMesa}});
  }
}
