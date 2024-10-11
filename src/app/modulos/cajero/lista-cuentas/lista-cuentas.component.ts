import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { Cuenta } from 'src/app/modelos/Cuenta';

@Component({
  selector: 'app-lista-cuentas',
  templateUrl: './lista-cuentas.component.html',
  styleUrls: ['./lista-cuentas.component.scss']
})
export class ListaCuentasComponent implements OnInit {
  cuentasCerradas: Cuenta[] = [];
  filteredCuentas: Cuenta[] = [];
  paginatedCuentas: Cuenta[] = [];
  currentPage = 1;
  itemsPerPage = 10; 
  filterText: string = ''; 

  constructor(private cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.getCuentasCerradas();
  }

  getCuentasCerradas(): void {
    const idRestaurante = sessionStorage.getItem('id_restaurante') || '0';
    this.cuentaService.getCuentasCerradas(idRestaurante).subscribe(
      (data) => {
        this.cuentasCerradas = data.cuentas; 
        this.filteredCuentas = [...this.cuentasCerradas];
        this.updatePaginatedCuentas();
      },
      (error) => {
        console.error('Error fetching closed accounts', error);
      }
    );
  }

  updatePaginatedCuentas(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCuentas = this.filteredCuentas.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedCuentas();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCuentas.length / this.itemsPerPage);
  }

  onFilterChange(): void {
    if (this.filterText.trim()) {
      // Filter cuentas based on the search input
      this.filteredCuentas = this.cuentasCerradas.filter(cuenta => 
        cuenta.nit.toString().includes(this.filterText) || 
        cuenta.nombre_razon_social.toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {

      this.filteredCuentas = [...this.cuentasCerradas];
    }

    this.currentPage = 1; 
    this.updatePaginatedCuentas();
  }
}
