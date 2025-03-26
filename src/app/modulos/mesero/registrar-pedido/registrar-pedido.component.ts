import { Component, OnInit } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { MesaService } from './../../../services/mesas/mesa.service';
import { Mesa } from 'src/app/modelos/Mesa'; 
import { Cuenta } from 'src/app/modelos/Cuenta';
import { CuentaService } from 'src/app/services/pedido/cuenta.service';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {
  mostrarModal: boolean = false; // Ahora se maneja internamente
  categoriaSeleccionada: string = '';
  idCategoriaSeleccionada: number | undefined;
  busquedaNombre: string = '';
  platillosAGuardar: Platillo[] = [];
  platillosDescripciones: { id: number, descripcion: string }[] = [];
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
  nombreMesa: string = '';
  rol_user: any = '';
  mesa: Mesa | undefined;
  //el id de la cuenta 
  id_cuenta:number=0;
  
  constructor(private descripcionPedidoService: DescripcionPedidoService,
    private route: ActivatedRoute,
    private platilloService: PlatillosService,
    public pedidoselectService: PedidoService,
    private categoriaService: CategoriaService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private cuentasS:CuentaService,
    private mesaService: MesaService) { }

  ngOnInit(): void {
    this.id_restaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
    this.getPlatillos();
    this.getCategorias();
    this.route.queryParams.subscribe(params => {
      this.rol_user = parseInt(sessionStorage.getItem('rol_empleado') || '0');
      if (this.rol_user === 2) {
        this.getPrimerMesa();
        this.mostrarModal=true;
      } else {
        this.numeroMesa = params['mesaSeleccionada'];
        this.nombreMesa = params['nombreMesa'];
      }
    });
  }

  getPrimerMesa(): void {
    this.mesaService.getMesas(this.id_restaurante.toString()).subscribe((res: any) => {
      if (res && res.mesas[0] && res.mesas.length > 0) {
        this.numeroMesa = res.mesas[0].id.toString();
        this.nombreMesa = res.mesas[0].nombre;
      } else {
        this.numeroMesa = '0';
        this.nombreMesa = 'Sin mesas';
      }
    });
  }

  switchStateChanged() {
    this.tipo = this.switchState ? 'Llevar' : 'Local';
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
  }

  getPlatillos() {
    let idPedidos = sessionStorage.getItem('id_restaurante') || '0';
    this.platilloService.getPlatillosMenu(idPedidos).subscribe(
      (res: any) => {
        let filteredPlatillos = res.platillo.filter((platillo: any) => {
          return (this.idCategoriaSeleccionada && this.idCategoriaSeleccionada !== 0) ?
            platillo.id_categoria === this.idCategoriaSeleccionada && platillo.disponible && platillo.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase()) :
            platillo.disponible && platillo.nombre.toLowerCase().includes(this.busquedaNombre.toLowerCase());
        });
        this.platillos = filteredPlatillos;
        this.platillosFiltrados = this.platillos;
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeCategoria(event: any) {
    this.idCategoriaSeleccionada = parseInt(event.target.value);
    this.getPlatillos();
  }

  getCategorias() {
    this.categoriaService.getCategorias(this.id_restaurante).subscribe(
      (data: any) => {
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

    if (this.platillosAGuardar.length === 0) {
      this.toastr.info('No se seleccionó ningún platillo', 'Información');
      return;
    }

    const platillosConDescripciones: PlatilloPedido[] = [];
    const platillosSinDescripcion: Map<number, PlatilloPedido> = new Map();

    this.platillosAGuardar.forEach((platillo, index) => {
      const cantidad = this.diccionarioDeCantidades[index] || 1;
      const descripcion = this.platillosDescripciones[index]?.descripcion || '';

      if (descripcion) {
        platillosConDescripciones.push({
          id_platillo: platillo.id,
          precio_unitario: platillo.precio,
          cantidad,
          detalle: descripcion
        });
      } else {
        if (platillosSinDescripcion.has(platillo.id)) {
          let platilloExistente = platillosSinDescripcion.get(platillo.id)!;
          platilloExistente.cantidad += cantidad;
        } else {
          platillosSinDescripcion.set(platillo.id, {
            id_platillo: platillo.id,
            precio_unitario: platillo.precio,
            cantidad,
            detalle: ''
          });
        }
      }
    });

    const todosLosPlatillos = [...platillosConDescripciones, ...Array.from(platillosSinDescripcion.values())];
    const id_mesa = this.numeroMesa;
    const id_empleado = this.sessionService.getUsuario()?.id || '';
    const pedidoCompleto = {
      platillos: todosLosPlatillos,
      id_mesa: id_mesa,
      tipo: this.tipo.toLowerCase(),
      id_empleado: id_empleado
    };

    if (this.rol_user === 2) {
      this.mostrarModal = true; // Cambiar el estado de mostrarModal
      console.log(this.mostrarModal);
      this.registrarPedido(pedidoCompleto);
    } else {
      this.registrarPedido(pedidoCompleto);
    }
  }

  registrarPedido(pedido: any) {
    const formData = new FormData();
    formData.append('platillos', JSON.stringify(pedido.platillos));
    formData.append('id_mesa', pedido.id_mesa.toString());
    formData.append('tipo', pedido.tipo);
    formData.append('id_empleado', pedido.id_empleado.toString());
    let id_restaurante = sessionStorage.getItem('id_restaurante');
    formData.append('id_restaurante', id_restaurante || '');

    this.pedidoselectService.storePedido(formData).subscribe(
      (response) => {
        this.id_cuenta=(response.pedido.id_cuenta);
        this.cuentasS.saveId(this.id_cuenta);
        console.log('Se registró el pedido', response);
        this.toastr.success('Se registró el pedido correctamente', 'Éxito');
      },
      (error) => {
        console.error('Error al almacenar el pedido', error);
        this.toastr.error('El pedido no se registró', 'Error');
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
    this.mostrarModal = false;
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
