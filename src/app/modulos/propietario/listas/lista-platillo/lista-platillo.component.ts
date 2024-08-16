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
<<<<<<< HEAD
export class ListaPlatilloComponent implements OnInit {
  filterPlatillos = '';
  platillos: Platillo[] = [];
  platillosFiltrados: Platillo[] = [];
  selectedPlatilloId: number | null = null;
  storageUrl = environment.backendStorageUrl;
  textoBuscador: string = '';

  id_restaurante: any;

  // Paginación
  public pageSize: number = 10; // Cantidad de elementos por página
  public currentPage: number = 1; // Página actual

  constructor(
    private router: Router,
    private platilloService: PlatillosService,
    private modalService: ModalEliminarPlatilloService,
  ) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
=======
export class ListaPlatilloComponent {
  filterPlatillos='';
  platillos: Platillo[] = [];
  platillosFiltrados:Platillo[]=[];
  selectedPlatilloId: number | null = null;
  storageUrl = environment.backendStorageUrl;
  textoBuscador:string = '';
  constructor(private router: Router, private platilloService: PlatillosService,
    private modalService: ModalEliminarPlatilloService,
   ) {
  }

  ngOnInit(): void {
>>>>>>> master
    this.getPlatillos();
  }

  editarPlatillo(id: number) {
    this.router.navigate(['lista/editar-platillo'], { queryParams: { platilloId: id } });
  }

<<<<<<< HEAD
  getPlatillos(): void {
    this.platilloService.getPlatillos(this.id_restaurante).subscribe(
      res => {
        console.log("Response from service:", res);
        this.platillos = res.platillos;
        this.filtrarPlatillos();
      },
      error => {
        console.error("Error fetching platillos:", error);
=======

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
>>>>>>> master
      }
    );
  }

  eliminarPlatillo(id: number) {
    this.modalService.openModal(id, this.platillos);
  }

<<<<<<< HEAD
  onSearchChange(searchValue: string): void {
=======
  onSearchChange(searchValue: string): void {  
>>>>>>> master
    this.textoBuscador = searchValue.trim().toLowerCase();
    this.filtrarPlatillos();
  }

<<<<<<< HEAD
  filtrarPlatillos(): void {
    if (this.textoBuscador === '') {
      this.platillosFiltrados = this.platillos;
    } else {
=======
  filtrarPlatillos():void{
    if (this.textoBuscador === '') {
      // Si el campo de búsqueda está vacío, mostrar todos los platillos
      this.platillosFiltrados = this.platillos;
    } else {
      // Filtrar los platillos por nombre y categoría
>>>>>>> master
      this.platillosFiltrados = this.platillos.filter(platillo =>
        platillo.nombre.toLowerCase().includes(this.textoBuscador) || platillo.categoria.nombre.toLowerCase().includes(this.textoBuscador)
      );
    }
<<<<<<< HEAD
    this.currentPage = 1; // Reinicia la página actual a la primera página
  }

  get pagedPlatillos(): Platillo[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.platillosFiltrados.slice(startIndex, startIndex + this.pageSize);
  }

  get pageCount(): number {
    return Math.ceil(this.platillosFiltrados.length / this.pageSize);
  }

  get pagesArray(): number[] {
    return Array(this.pageCount).fill(0).map((x, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pageCount) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
=======

  }
}
   
>>>>>>> master
