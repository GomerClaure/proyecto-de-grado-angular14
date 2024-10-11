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
export class ListaPlatilloComponent implements OnInit {
  filterPlatillos = '';
  platillos: Platillo[] = [];
  platillosFiltrados: Platillo[] = [];
  selectedPlatilloId: number | null = null;
  storageUrl = environment.backendStorageUrl;
  textoBuscador: string = '';
  id_restaurante: any;
  public pageSize: number = 7;
  public currentPage: number = 1;

  constructor(
    private router: Router,
    private platilloService: PlatillosService,
    private modalService: ModalEliminarPlatilloService,
  ) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.getPlatillos();
  }

  editarPlatillo(id: number) {
    this.router.navigate(['lista/editar-platillo'], { queryParams: { platilloId: id } });
  }

  getPlatillos(): void {
    this.platilloService.getPlatillos(this.id_restaurante).subscribe(
      res => {
        console.log("Response from service:", res);
        this.platillos = res.platillos;
        this.filtrarPlatillos();
      },
      error => {
        console.error("Error fetching platillos:", error);
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

  filtrarPlatillos(): void {
    if (this.textoBuscador === '') {
      this.platillosFiltrados = this.platillos;
    } else {
      this.platillosFiltrados = this.platillos.filter(platillo =>
        platillo.nombre.toLowerCase().includes(this.textoBuscador) || platillo.categoria.nombre.toLowerCase().includes(this.textoBuscador)
      );
    }
    this.currentPage = 1;
  }

  get pagedPlatillos(): Platillo[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.platillosFiltrados.slice(startIndex, startIndex + this.pageSize);
  }

  get pageCount(): number {
    return Math.ceil(this.platillosFiltrados.length / this.pageSize);
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.pageCount) {
      this.currentPage = page;
    }
  }
}
