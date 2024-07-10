import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { environment } from 'src/environments/environment';
import { ModalEliminarPlatilloService } from 'src/app/services/modales/modal-eliminar-platillo.service';

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

  id_restaurante:any;

  constructor(private router: Router, private platilloService: PlatillosService,
    private modalService: ModalEliminarPlatilloService,
   ) {
  }

  ngOnInit(): void {
    //Sacamos el id del restaurante para filtrar los platillos de un restaurante en concreto
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
    //Obtenemos los platillos segun el id_restaurante
    this.getPlatillos();
  }

  editarPlatillo(id: number) {
    this.router.navigate(['lista/editar-platillo'], { queryParams: { platilloId: id } });
  }


  getPlatillos(): void {
    this.platilloService.getPlatillos(this.id_restaurante).subscribe(
      res => {
        // Verificar si res.platillo es un arreglo o un solo objeto y convertirlo a un arreglo si es necesario
        if (Array.isArray(res.platillo)) {
          this.platillos = res.platillo;
        } else {
          this.platillos = [res.platillo];
        }
        this.platillosFiltrados = this.platillos;
        console.log(this.platillos);
      },
      err => {
        console.error('Error al obtener los platillos', err);
      }
    );
  }

  eliminarPlatillo(id: number) {
    this.modalService.openModal(id, this.platillos);
  }

  onSearchChange(searchValue: string): void {  
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
   