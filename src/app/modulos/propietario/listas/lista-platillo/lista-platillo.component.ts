import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { environment } from 'src/environments/environment';
import { ModalEliminarPlatilloService } from 'src/app/services/modales/modal-eliminar-platillo.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-lista-platillo',
  templateUrl: './lista-platillo.component.html',
  styleUrls: ['./lista-platillo.component.scss']
})
export class ListaPlatilloComponent {
  filterPlatillos='';
  platillos: Platillo[] = [];
  platillosFiltrados:Platillo[]=[];
  selectedPlatilloId: number | null = null;
  storageUrl = environment.backendStorageUrl;
  textoBuscador:string = '';
  constructor(private router: Router, private platilloService: PlatillosService,
    private modalService: ModalEliminarPlatilloService,
    private toast:NgToastService) {
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
                // Ordenar los platillos por nombre en orden alfabético
                this.platillos.sort((a, b) => a.nombre.localeCompare(b.nombre));
                // Tomar los primeros 10 platillos
                this.platillos = this.platillos.slice(0, 10);
                this.platillosFiltrados=this.platillos;
        console.log(this.platillos);
      },
      err => {
        console.log(err);
      }
    );
  }

  showSuccess(message: string) {
    console.log('entra')
    this.toast.success({ detail: message, summary: 'Success', duration: 5000 });
  }

  eliminarPlatillo(id: number) {
    this.modalService.openModal(id, this.platillos);
  }
  
  // Esta función será llamada desde el servicio modal una vez que la eliminación sea confirmada
  confirmarEliminacion() {
    this.showSuccess('Platillo eliminado');
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.textoBuscador = searchValue.trim().toLowerCase();
    this.filtrarPlatillos();
  }

  filtrarPlatillos():void{
    if (this.textoBuscador === '') {
      // Si el campo de búsqueda está vacío, mostrar todos los platillos
      this.platillosFiltrados = this.platillos;
    } else {
      // Filtrar los platillos por nombre y categoría
      this.platillosFiltrados = this.platillos.filter(platillo =>
        platillo.nombre.toLowerCase().includes(this.textoBuscador) || platillo.categoria.nombre.toLowerCase().includes(this.textoBuscador)
      );
    }

  }
}
   