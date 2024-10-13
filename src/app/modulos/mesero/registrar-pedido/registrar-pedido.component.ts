import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { Platillo } from 'src/app/modelos/Platillo';
import { PlatilloPedido } from 'src/app/modelos/PlatilloPedido';
import { Categoria } from 'src/app/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';
import { SessionService } from 'src/app/services/auth/session.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {
  categoriaSeleccionada: string = '';
  idCategoriaSeleccionada: number | undefined;
  busquedaNombre: string = '';
  //Array donde estan los platillos seleccionados
  platillosAGuardar: Platillo[] = [];
  //Array de descripciones 
  platillosDescripciones: { id: number, descripcion: string }[] = [];
  //Array de cantidades
  diccionarioDeCantidades: { [id: number]: number } = {};
  numeroMesa: string = '';
  platillos: Platillo[] = [];
  categoria: Categoria[] = [];
  categorias: any[] = [];
  switchState: boolean = false;
  tipo: string = 'Local';
  descripcion: string = '';
  storageUrl = environment.backendStorageUrl;
  textoBuscador: string = '';
  platillosFiltrados: Platillo[] = [];
  id_restaurante: any;
  nombreMesa:string='';
  
  constructor(private descripcionPedidoService: DescripcionPedidoService,
    private route: ActivatedRoute,
    private platilloService: PlatillosService,
    public pedidoselectService: PedidoService,
    private categoriaService: CategoriaService,
    private sessionService: SessionService,
    private toast: NgToastService
  ) { }


  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.getPlatillos();
    this.getCategorias();
    this.route.queryParams.subscribe(params => {
      this.numeroMesa = params['mesaSeleccionada'];
      this.nombreMesa = params['nombreMesa']
    });
  }
  switchStateChanged() {
    if (this.switchState) {
      this.tipo = 'Llevar'
      console.log(this.tipo);
    } else {
      this.tipo = 'Local'
      console.log(this.tipo)
    }
  }
  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    this.textoBuscador = searchValue.trim().toLowerCase();
    this.filtrarPlatillos();
  }
  filtrarPlatillos(): void {
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
  getPlatillos() {
    this.platilloService.getPlatillosMenu().subscribe(
      (res: any) => {
        // Filtrar solo los platillos de la categoría seleccionada y que coincidan con el término de búsqueda
        let filteredPlatillos = res.platillo.filter((platillo: any) => {
          if (this.idCategoriaSeleccionada && this.idCategoriaSeleccionada !== 0) {
            return platillo.id_categoria === this.idCategoriaSeleccionada && platillo.disponible === true && platillo.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase());
          } else {
            return platillo.disponible === true && platillo.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase());
          }
        });
        this.platillos = filteredPlatillos;
        this.platillosFiltrados = this.platillos;
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

  getCategorias() {
    this.categoriaService.getCategorias(this.id_restaurante).subscribe(
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
  }
  retirarPlatillo(index: number) {
    this.pedidoselectService.platillosSeleccionados.splice(index, 1);
  }
  guardarPedido() {
    this.platillosAGuardar = this.pedidoselectService.getPlatillosSeleccionados();
    this.platillosDescripciones = this.descripcionPedidoService.getDescripciones();

    const platillosConDescripciones: PlatilloPedido[] = [];
    const platillosSinDescripcion: Map<number, PlatilloPedido> = new Map();

    this.platillosAGuardar.forEach((platillo, index) => {
      // Obtener la cantidad del platillo utilizando el índice
      const cantidad = this.diccionarioDeCantidades[index] || 1;

      // Obtener la descripción correspondiente utilizando el índice
      const descripcion = this.platillosDescripciones[index]?.descripcion || '';

      if (descripcion) {
        // Si el platillo tiene descripción, lo agregamos directamente
        const platilloConDescripcion: PlatilloPedido = {
          id_platillo: platillo.id,
          precio_unitario: platillo.precio,
          cantidad: cantidad,
          detalle: descripcion
        };
        platillosConDescripciones.push(platilloConDescripcion);
      } else {
        // Si el platillo no tiene descripción, verificamos si ya existe en el Map para sumar la cantidad
        if (platillosSinDescripcion.has(platillo.id)) {
          let platilloExistente = platillosSinDescripcion.get(platillo.id)!;
          platilloExistente.cantidad += cantidad;
        } else {
          // Si no existe, lo agregamos al Map
          platillosSinDescripcion.set(platillo.id, {
            id_platillo: platillo.id,
            precio_unitario: platillo.precio,
            cantidad: cantidad,
            detalle: ''
          });
        }
      }
    });

    // Convertimos los platillos sin descripción a un array y los combinamos con los de descripción
    const todosLosPlatillos = [...platillosConDescripciones, ...Array.from(platillosSinDescripcion.values())];

    const id_mesa = this.numeroMesa;
    const id_empleado = this.sessionService.getUsuario()?.id || '';

    const pedidoCompleto = {
      platillos: todosLosPlatillos,
      id_mesa: id_mesa,
      tipo: this.tipo.toLowerCase(),
      id_empleado: id_empleado
    };

    const formData = new FormData();
    formData.append('platillos', JSON.stringify(pedidoCompleto.platillos));
    formData.append('id_mesa', id_mesa.toString());
    formData.append('tipo', this.tipo.toLowerCase());
    formData.append('id_empleado', id_empleado.toString());
    let id_restaurante = sessionStorage.getItem('id_restaurante');
    formData.append('id_restaurante', id_restaurante || '');

    this.pedidoselectService.storePedido(formData).subscribe(
      (response) => {
        console.error('se registró el pedido', response);
        this.toast.success({ detail: "SUCCESS", summary: 'Se registró el pedido con éxito', duration: 2000 });
      },
      (error) => {
        console.error('Error al almacenar el pedido', error);
        this.toast.error({ detail: "ERROR", summary: 'No seleccionó ningún platillo', duration: 1500 });
      }
    );

    this.pedidoselectService.limpiarSeleccion();
    this.descripcionPedidoService.limpiarDescripciones();
    this.diccionarioDeCantidades = {};
    this.tipo = 'Local';
    this.busquedaNombre = '';
    this.idCategoriaSeleccionada = undefined;
    this.platillos = [];
    this.switchState = false;
    this.getPlatillos();
  }


  increment(index: number) {
    let cantidad = this.diccionarioDeCantidades[index] || 1;
    if (cantidad < 100) cantidad++;
    this.diccionarioDeCantidades[index] = cantidad;
  }

  decrement(index: number) {
    let cantidad = this.diccionarioDeCantidades[index] || 1;
    if (cantidad > 1) cantidad--;
    this.diccionarioDeCantidades[index] = cantidad;
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/Imagen-rota.jpg';
  }

}
