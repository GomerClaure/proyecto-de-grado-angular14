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
  storageUrl = environment.backendStorageUrl;
  constructor(private sharedDataService: DescripcionPedidoService, private route: ActivatedRoute, private platilloService: PlatillosService, public pedidoselectService: PedidoService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getPlatillos();
    this.getCategorias();
    this.descripcion = this.sharedDataService.getDescripcion();
    console.log(this.descripcion)
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
  retirarPlatillo(index: number) {
    this.pedidoselectService.platillosSeleccionados.splice(index, 1);
  }

  guardarPedido() {
    if (this.categoriaSeleccionada !== '' && this.descripcion !== '') {
      // Obtener el nombre del platillo seleccionado
      const nombrePlatillo = this.categoriaSeleccionada;
      // Crear el objeto platillo con su descripción
      const platillo = { nombre: nombrePlatillo, descripcion: this.descripcion };
      // Agregar el platillo al arreglo de platillos seleccionados en el servicio
      this.pedidoselectService.agregarSeleccion(platillo);
      // Limpiar los campos de categoría y descripción
      this.categoriaSeleccionada = '';
      this.descripcion = '';
    }
    console.log(this.pedidoselectService.getpedido())
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

  borrarSeleccion() {
    console.log("Entra a Borrar")
    this.pedidoselectService.limpiarSelecciones();
  }

  AgregarPlatillo(platillo: Platillo) {
    this.categoriaSeleccionada = platillo.nombre;
    this.pedidoselectService.agregarSeleccion(platillo);
  }

  setDescripcion(platilloNombre: string) {
    this.sharedDataService.setDescripcion(platilloNombre);
  }
}
