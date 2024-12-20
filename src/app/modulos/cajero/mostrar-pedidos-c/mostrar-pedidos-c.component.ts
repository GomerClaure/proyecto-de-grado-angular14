import { Component, OnInit} from '@angular/core';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';
import { Cuenta } from 'src/app/modelos/Cuenta';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-mostrar-pedidos-c',
  templateUrl: './mostrar-pedidos-c.component.html',
  styleUrls: ['./mostrar-pedidos-c.component.scss']
})
export class MostrarPedidosCComponent implements OnInit {
  cuentasPorMesaCopy: Cuenta[] = [];
  cuentasPorMesa: Cuenta[] = [];
  errorMessage: string = '';
  id_restaurante: number = 0;
  id_empleado: number = 0;
  textoBuscador: string = '';
  nombreRestaurante: string = 'LUGO'; 

  constructor(private cuentaService: CuentaService,
              private pedidoCocinaService: PedidosCocinaService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.nombreRestaurante = sessionStorage.getItem('nombre_restaurante') || 'LUGO';
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
    this.verificarPedidosNuevos();
  }

  verificarPedidosNuevos(): void {
    console.log('Verificando pedidos nuevos');
    this.pedidoCocinaService.pedidos$.subscribe(update => {
      console.log('Pedido nuevo:', update);
      
      if (update?.evento === 'PedidoCreado') {
        const idCuenta = update?.datos.idCuenta;
        this.cuentaService.getCuenta(idCuenta).subscribe(
          response => {
            let cuentaExistente: Cuenta | undefined = this.cuentasPorMesa.find(cuenta => cuenta.id=== idCuenta);
            let cuentaObtenida: Cuenta = response.cuenta;
            if (cuentaExistente) {
              cuentaExistente.platos = response.cuenta.platos;
              cuentaExistente.monto_total = response.cuenta.monto_total
            } else {
              console.log('Cuenta no encontrada, agregando cuenta:', cuentaObtenida);
              this.cuentasPorMesa.push(cuentaObtenida);
            }
            this.cuentasPorMesaCopy = this.cuentasPorMesa
           console.log('pedidos por mesa:', this.cuentasPorMesa);
          },
          error => {
            console.error('Error al obtener la cuenta:', error);
          }
        );

      }
    });
  }

  obtenerPedidos(): void {
    this.cuentaService.getCuentasAbiertas(this.id_restaurante).subscribe(
      (response) => {
        console.log(response)
        this.cuentasPorMesa = response.cuentas;
        this.cuentasPorMesaCopy = this.cuentasPorMesa;
      },
      error => {
        console.error('Error al obtener pedidos:', error);
        this.errorMessage = 'Error al obtener los pedidos';
      }
    );
  }

  onSearchChange(searchValue: string): void {
    this.textoBuscador = searchValue.trim().toLowerCase();
    console.log('Texto buscador:', this.textoBuscador);
    this.filtrarCuentas();
  }

  filtrarCuentas(): void {
    if (this.textoBuscador === '') {
      this.cuentasPorMesa= this.cuentasPorMesaCopy;
    } else {
      this.cuentasPorMesa= this.cuentasPorMesaCopy;
      this.cuentasPorMesa = this.cuentasPorMesa.filter(pedido =>
        pedido.nombre_mesa.trim().toLowerCase().includes(this.textoBuscador) ||
        pedido.nombre_razon_social.toLowerCase().includes(this.textoBuscador)
      );
    }
  }

  CerrarCuenta(id: number) {
    console.log(id);
    this.cuentaService.cerrarCuenta(id).subscribe(
      response => {
        console.log('Cuenta cerrada:', response);
        this.toastr.success('Se cerro la cuenta correctamente','Exito');
        this.cuentasPorMesa=this.cuentasPorMesa.filter(cuenta=>cuenta.id !==id)
      },
      error => {
        console.error('error al cerrar:', error);
        this.toastr.info('No se puede cerrar la cuenta el pedido no ha sido entregado aun','Información');
      }
    );
  }
  
  imprimirCuenta(cuentaId: number) {
    const cuenta = this.cuentasPorMesa.find(p => p.id === cuentaId);
    if (cuenta) {
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

  descargarCuenta(cuentaId: number) {
    const cuenta = this.cuentasPorMesa.find(p => p.id === cuentaId);
    if (cuenta) {
      // Configuración del documento para ancho de 8.5 cm
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85, 200], // Ancho de 8.5 cm y altura ajustable
      });
  
      // Centro del documento en el ancho de 85 mm
      const pageWidth = 85;
      const centerX = pageWidth / 2;
  
      // Agregar encabezado y detalles de la cuenta centrados
      doc.setFontSize(12);
      doc.text('Restaurante LUGO', centerX, 10, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`Mesa: ${cuenta.nombre_mesa}`, centerX, 20, { align: 'center' });
      doc.text(`Razón Social: ${cuenta.nombre_razon_social}`, centerX, 30, { align: 'center' });
      doc.text(`NIT: ${cuenta.nit}`, centerX, 40, { align: 'center' });
  
      // Configuración de la tabla centrada
      autoTable(doc, {
        startY: 50,
        head: [['Plato', 'Cant.', 'Precio', 'Total']],
        body: cuenta.platos.map(plato => [
          plato.nombre,
          plato.cantidad.toString(),
          `${plato.precio.toString()} Bs`,
          // `${(plato.precio * plato.cantidad).toFixed(2)} Bs`,
        ]),
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 1 },
        columnStyles: {
          0: { cellWidth: 30 }, // Plato
          1: { cellWidth: 10 }, // Cantidad
          // 2: { cellWidth: 20 }, // Precio
          3: { cellWidth: 20 }, // Total
        },
        margin: { left: (pageWidth - 80) / 2 }, // Centrar tabla en 85 mm de ancho
      });
  
      // Obtener la posición final de la tabla para añadir el total
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.text(`Total: ${cuenta.monto_total.toString()} Bs`, centerX, finalY, { align: 'center' });
  
      // Descargar el PDF
      doc.save('cuenta_lugo.pdf');
    }
  }
  
  
}
