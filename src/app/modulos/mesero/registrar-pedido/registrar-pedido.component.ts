import { Component, OnInit } from '@angular/core';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { Platillo } from 'src/app/modelos/Platillo';
import { Categoria } from 'src/app/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {
  categoriaSeleccionada: string = '';
  numeroMesa: string = '';
  platillos: Platillo[] = [];
  categoria: Categoria[] = [];
  categorias: any[] = [];
  descripcion: string = '';
  //lista:any;
  storageUrl = environment.backendStorageUrl;
  constructor(private descripcionPedidoService: DescripcionPedidoService, private route: ActivatedRoute, private platilloService: PlatillosService, public pedidoselectService: PedidoService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getPlatillos();
    this.getCategorias();
    this.route.queryParams.subscribe(params => {
      this.numeroMesa = params['mesaSeleccionada'];
    });
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
  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: any) => { // Ajusta el tipo de datos esperado
        this.categorias = data.categorias; // Cambia this.categoria a this.categorias
      },
      error => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }
  agregarPlatillo(platillo: Platillo) {
    this.pedidoselectService.agregarSeleccion(platillo);
  }
  setPlatilloSeleccionado(index: number) {
    this.descripcionPedidoService.platilloNombreSeleccionado(index);
  }
  retirarPlatillo(index: number) {
    this.pedidoselectService.platillosSeleccionados.splice(index, 1);
  }
  guardarPedido(){
    this.pedidoselectService.guardarPedido(this.descripcionPedidoService.getDescripciones());
  }
  increment(platilloId: number) {
    const quantityInput = document.getElementById('quantityP' + platilloId) as HTMLInputElement;
    //input cast
    let cantidad = parseInt(quantityInput.value);
    if ( cantidad < 100) cantidad++;
    quantityInput.value = cantidad.toString();

  }

  decrement(platilloId: number) {
    const quantityInput = document.getElementById('quantityP' + platilloId) as HTMLInputElement;
    let cantidad = parseInt(quantityInput.value);
    if ( cantidad > 1) cantidad--;
    quantityInput.value = cantidad.toString();
  }
}
