import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { Cuenta } from 'src/app/modelos/Cuenta';
import { get } from 'jquery';

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
  id_restaurant: number;
  nombreRestaurante: string =  sessionStorage.getItem('nombre_restaurante') || 'LUGO'; 

  constructor(private cuentaService: CuentaService) { 
    this.id_restaurant=0;
  }

  ngOnInit(): void {
    this.id_restaurant = +sessionStorage.getItem('id_restaurante')!;
    this.getCuentasCerradas();
  }

  getCuentasCerradas(): void {
    this.cuentaService.getCuentasCerradas(this.id_restaurant).subscribe(
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

  imprimirCuenta(cuentaId: number) {
    const cuenta = this.paginatedCuentas.find(p => p.id === cuentaId);
    if (cuenta) {
      console.log('Imprimir cuenta:', cuenta);
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(`
        <html>
          <head>
            <title>Imprimir Cuenta</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0px;
              }
              .container {
                margin: 0 auto;
                padding-inline:0px;
                padding-top: 0px;
                padding-bottom: 20px;
              }
              h1, h2 {
                text-align: center;
                color: #333;
              }
              .table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              .table th, .table td {
                padding: 10px;
                text-align: left;
                border: 1px solid #ddd;
              }
              .table th {
                background-color: #f2f2f2;
              }
              .total {
                text-align: right;
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div class="container">
              <h1>Restaurante ${this.nombreRestaurante}</h1>
              <h2>Mesa: ${cuenta.nombre_mesa}</h2>
              <p><strong>Razón Social:</strong> ${cuenta.nombre_razon_social}</p>
              <p><strong>NIT:</strong> ${cuenta.nit}</p>
              <table class="table">
                <thead>
                  <tr>
                    <th>Plato</th>
                    <th>Cantidad</th>
                    <th>Total (Bs)</th>
                  </tr>
                </thead>
                <tbody>
                  ${cuenta.platos.map(plato => `
                    <tr>
                      <td>${plato.nombre}</td>
                      <td>${plato.cantidad}</td>
                      <td>${(plato.precio * plato.cantidad).toFixed(2)} Bs</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
  
              <div class="total">
                <p><strong>Total: ${cuenta.monto_total} Bs</strong></p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow?.document.close();
    }
  }

}
