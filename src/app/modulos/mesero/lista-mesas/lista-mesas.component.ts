import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.scss']
})
export class ListaMesasComponent implements OnInit {
  mesaSeleccionada: string = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  RegistrarMesa(mesaSeleccionada:string){
    this.router.navigate(['mesero/registrar-pedido'],{queryParams:{mesaSeleccionada:mesaSeleccionada}});
  }
  seleccionarMesa(id: any) {
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
  }
}
