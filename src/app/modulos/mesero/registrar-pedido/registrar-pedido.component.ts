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
  idCategoriaSeleccionada: number | undefined;
  busquedaNombre: string = '';
  numeroMesa: string = '';
  platillos: Platillo[] = [];
  categoria: Categoria[] = [];
  categorias: any[] = [];
  descripcion: string = '';
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
      (res: any) => {
        // Filtrar solo los platillos de la categoría seleccionada y que coincidan con el término de búsqueda
        let filteredPlatillos = res.platillo.filter((platillo: any) => {
          if (this.idCategoriaSeleccionada && this.idCategoriaSeleccionada !== 0) {
            return platillo.id_categoria === this.idCategoriaSeleccionada && platillo.disponible === true && platillo.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase());
          } else {
            return platillo.disponible === true && platillo.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase());
          }
        });
  
        // Si el término de búsqueda está vacío, mostrar todos los platillos
        if (!this.busquedaNombre) {
          filteredPlatillos = res.platillo.filter((platillo: any) => {
            if (this.idCategoriaSeleccionada && this.idCategoriaSeleccionada !== 0) {
              return platillo.id_categoria === this.idCategoriaSeleccionada && platillo.disponible === true;
            } else {
              return platillo.disponible === true;
            }
          });
        }
  
        // Limitar a los 10 primeros platillos si se ha seleccionado una categoría y el término de búsqueda está vacío
        if (!this.busquedaNombre && this.idCategoriaSeleccionada && this.idCategoriaSeleccionada !== 0) {
          filteredPlatillos = filteredPlatillos.slice(0, 10);
        }
  
        this.platillos = filteredPlatillos;
        console.log(this.platillos);
      },
      err => {
        console.log(err); 
      }
    );
  }
  
  
  onChangeCategoria(event: any) {
    this.idCategoriaSeleccionada = parseInt(event.target.value); // Convierte el valor a un número entero
    this.getPlatillos(); // Llama a getPlatillos() para actualizar la lista de platillos según la categoría seleccionada
  }
  onBuscar() {
    // Elimina los espacios en blanco extra al principio y al final del término de búsqueda
    const searchTerm = this.busquedaNombre.trim().toLowerCase();
    
    // Filtra los platillos según el término de búsqueda
    this.platillos = this.platillos.filter((platillo: Platillo) => {
      return platillo.nombre.toLowerCase().includes(searchTerm);
    });
  }
  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: any) => {
        // Añade la opción "Todos" al principio de la lista de categorías
        this.categorias = [{ id: 0, nombre: 'Todos' }, ...data.categorias];
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
    this.descripcionPedidoService.obtenerDescripcion();
    //this.descripcion = this.platilloSeleccionado.descripcion;
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
