import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/modelos/Menu';
import { Platillo } from 'src/app/modelos/Platillo';
import { Categoria } from 'src/app/modelos/Categoria';
import { PlatillosPorCategoria } from 'src/app/modelos/PlatillosPorCategoria';
import { ModalMostrarPlatilloService } from 'src/app/services/modales/modal-mostrar-platillo.service';

@Component({
  selector: 'app-vista-menu',
  templateUrl: './vista-menu.component.html',
  styleUrls: ['./vista-menu.component.scss']
})
export class VistaMenuComponent implements OnInit {

  public baseUrl = environment.backendStorageUrl;
  private idMenu: number;
  public menu!: Menu;
  public nombreRestaurante: string;
  public imagenesPorPagina: any[][];
  public platilloPorCategoria!: PlatillosPorCategoria[];
  public platilloPorCategoriaPagina!: PlatillosPorCategoria[][];
<<<<<<< HEAD
  public tamanioMaximoPagina: number;
  public espacioPorPlatillo: number;
  public espacioPorCategoria: number;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private modalService: ModalMostrarPlatilloService) {
    this.idMenu = parseInt(this.route.snapshot.paramMap.get('menu') || '0');
    this.nombreRestaurante = 'Restaurante';
    this.tamanioMaximoPagina = 1000;
    this.espacioPorCategoria = 100;
    this.platilloPorCategoria = [];
    this.espacioPorPlatillo = 50;
=======
  randomIndex: { [key: string]: number } = {};

  constructor(private menuService: MenuService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,private modalService:ModalMostrarPlatilloService) {
    this.idMenu = parseInt(this.route.snapshot.paramMap.get('menu') || '0');
    this.nombreRestaurante = 'Restaurante';
    this.platilloPorCategoria = [];
>>>>>>> master
    this.imagenesPorPagina = [];
    this.menu = {
      id: 0,
      portada: '',
      tema: '',
      qr: '',
<<<<<<< HEAD
    };
  }

  ngOnInit(): void {
    this.actualizarEspacioPorPantalla();
    this.getMenuById();
  }

=======
    }

  }

  ngOnInit(): void {
    this.getMenuById();
  }


>>>>>>> master
  getMenuById() {
    this.menuService.getMenuById(this.idMenu).subscribe(
      (response: any) => {
        this.menu = response.menu;
        const platillos: Platillo[] = response.platillos;
        this.platilloPorCategoria = this.transformarDatos(platillos);
<<<<<<< HEAD
        const limitePlatillosPorPagina = this.calcularLimitePlatillosPorPagina(this.platilloPorCategoria);
        console.log('limitePlatillosPorPagina', limitePlatillosPorPagina);
        this.platilloPorCategoriaPagina = this.agruparPlatillosPorPagina(this.platilloPorCategoria, limitePlatillosPorPagina);
=======
        this.platilloPorCategoriaPagina = this.agruparPlatillosPorPagina(this.platilloPorCategoria, 4);
        this.platilloPorCategoriaPagina = this.agruparCategoriasDeCadaPagina(this.platilloPorCategoriaPagina);
>>>>>>> master
        this.generarImagenesPorPagina();
        let container = document.getElementById("container-ver-menu");
        container?.classList.add(this.menu.tema);
        console.log(this.imagenesPorPagina);
      }
    );
  }

<<<<<<< HEAD
  actualizarEspacioPorPantalla() {
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;
    console.log('anchoPantalla', anchoPantalla)
    console.log('altoPantalla', altoPantalla)
    this.tamanioMaximoPagina = Math.trunc(altoPantalla * 0.75);//mejor no redondearlo por si se excede
    this.espacioPorCategoria = 23;
    this.espacioPorPlatillo = 22.5;
  }

  onImgError(idElemento: string) {
    console.log(idElemento);
    let contenedor = document.getElementById(idElemento);
    if (contenedor) {
      contenedor.style.backgroundImage = 'url("assets/image/270021.jpg")';
    }
    // event.target.src = 'assets/image/2700.jpg';
  }

  portadaError(event: any) {
    event.target.src = 'assets/image/pp.png';
=======
  onImgError(event: any) {
    event.target.src = 'assets/image/27002.jpg';
>>>>>>> master
  }

  transformarDatos(platillos: Platillo[]): PlatillosPorCategoria[] {
    const categorias: Categoria[] = [];
    const platillosPorCategoria: PlatillosPorCategoria[] = [];

    platillos.forEach((platillo: Platillo) => {
      const categoriaExistente = categorias.find((categoria: Categoria) => categoria.id === platillo.categoria.id);
      if (!categoriaExistente) {
        categorias.push(platillo.categoria);
      }
    });

    categorias.forEach((categoria: Categoria) => {
      const platillosCategoria = platillos.filter((platillo: Platillo) => platillo.categoria.id === categoria.id);
      platillosPorCategoria.push({
        id: categoria.id,
        nombre: categoria.nombre,
        imagen: categoria.imagen,
        platillos: platillosCategoria
      });
    });

    return platillosPorCategoria;
  }
<<<<<<< HEAD

  calcularLimitePlatillosPorPagina(platillosPorCategoria: PlatillosPorCategoria[]): number {
    let totalEspacio = 0;
    let totalPlatillos = 0;

    for (const categoria of platillosPorCategoria) {
      totalEspacio += this.espacioPorCategoria + (categoria.platillos.length * this.espacioPorPlatillo);
      totalPlatillos += categoria.platillos.length;

      if (totalEspacio > this.tamanioMaximoPagina) {
        // Si el espacio total excede el tamaño máximo de la página, calcular cuántos platillos se pueden incluir
        const espacioRestante = this.tamanioMaximoPagina - (totalEspacio - (categoria.platillos.length * this.espacioPorPlatillo));
        const platillosRestantes = Math.floor(espacioRestante / this.espacioPorPlatillo);
        totalPlatillos -= (categoria.platillos.length - platillosRestantes);
        break;
      }
    }

    return totalPlatillos;
  }

  agruparPlatillosPorPagina(platillos: PlatillosPorCategoria[], limitePlatillosPorPagina: number): PlatillosPorCategoria[][] {
    const paginas: PlatillosPorCategoria[][] = [];
    let paginaActual: PlatillosPorCategoria[] = [];
    let espacioDisponible = this.tamanioMaximoPagina;
  
    for (const categoria of platillos) {
      let platillosRestantes = categoria.platillos.slice();
  
      while (platillosRestantes.length > 0) {
        const espacioCategoria = this.espacioPorCategoria;
        const espacioParaPlatillos = espacioDisponible - espacioCategoria;
        const numeroPlatillosPagina = Math.min(platillosRestantes.length, limitePlatillosPorPagina, Math.floor(espacioParaPlatillos / this.espacioPorPlatillo));
  
        if (numeroPlatillosPagina === 0 || espacioParaPlatillos < this.espacioPorPlatillo) {
          paginas.push(paginaActual);
          paginaActual = [];
          espacioDisponible = this.tamanioMaximoPagina;
        } else {
          const platillosPagina = platillosRestantes.splice(0, numeroPlatillosPagina);
  
          const categoriaPagina = {
            id: categoria.id,
            nombre: categoria.nombre,
            imagen: categoria.imagen,
            platillos: platillosPagina
          };
  
          paginaActual.push(categoriaPagina);
          espacioDisponible -= espacioCategoria + numeroPlatillosPagina * this.espacioPorPlatillo;
        }
      }
    }
  
    if (paginaActual.length > 0) {
      paginas.push(paginaActual);
    }
  
    return paginas;
  }

=======
  agruparPlatillosPorPagina(platillos: PlatillosPorCategoria[], limitePlatillosPorPagina: number): PlatillosPorCategoria[][] {
    const paginas: PlatillosPorCategoria[][] = [];
    let paginaActual: PlatillosPorCategoria[] = [];

    for (const categoria of platillos) {
      for (const platillo of categoria.platillos) {
        if (paginaActual.length === limitePlatillosPorPagina) {
          paginas.push(paginaActual);
          paginaActual = [];
        }


        paginaActual.push({ ...categoria, platillos: [platillo] });
        let banderaEstaEnPagina = false;
      }
    }


    if (paginaActual.length > 0) {
      paginas.push(paginaActual);
    }

    return paginas;
  }

  agruparCategoriasDeCadaPagina(platilosCategoriaPorPagina: PlatillosPorCategoria[][]): PlatillosPorCategoria[][] {
    const paginasAgrupadas: PlatillosPorCategoria[][] = [];

    platilosCategoriaPorPagina.forEach(pagina => {
      const categoriasAgrupadas: { [key: number]: PlatillosPorCategoria } = {};

      pagina.forEach(categoria => {
        const categoriaId = categoria.id;
        if (categoriaId in categoriasAgrupadas) {
          categoriasAgrupadas[categoriaId].platillos.push(...categoria.platillos);
        } else {
          categoriasAgrupadas[categoriaId] = { ...categoria };
        }
      });

      const categoriasAgrupadasArray = Object.values(categoriasAgrupadas);

      paginasAgrupadas.push(categoriasAgrupadasArray);
    });

    return paginasAgrupadas;
  }

>>>>>>> master
  getRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  generarImagenesPorPagina() {
    for (let index = 0; index < this.platilloPorCategoriaPagina.length; index++) {
<<<<<<< HEAD
      let pagina = this.platilloPorCategoriaPagina[index];

=======
      let pagina = this.platilloPorCategoriaPagina[index]
      
>>>>>>> master
      for (let indexCategoria = 0; indexCategoria < pagina.length; indexCategoria++) {
        let indiceAleatorio = this.getRandomIndex(pagina[indexCategoria].platillos.length);
        let platilloAleatorio = pagina[indexCategoria].platillos[indiceAleatorio];
        if (!this.imagenesPorPagina[index]) {
          this.imagenesPorPagina[index] = [];
        }
<<<<<<< HEAD

=======
        
>>>>>>> master
        this.imagenesPorPagina[index].push({
          nombre: platilloAleatorio.nombre,
          descripcion: platilloAleatorio.descripcion,
          precio: platilloAleatorio.precio,
          imagen: platilloAleatorio.imagen
        });
<<<<<<< HEAD
      }
    }
  }

=======

      }
    }
  }
>>>>>>> master
  onRowClick(platillo: any) {
    let nom = platillo.nombre;
    let img = platillo.imagen;
    let desc = platillo.descripcion;
    this.modalService.openModal(platillo);
<<<<<<< HEAD
    console.log(nom, img, desc);
  }
=======
    console.log(nom,img,desc)
}
>>>>>>> master
}
