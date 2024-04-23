import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/modelos/Menu';
import { Platillo } from 'src/app/modelos/Platillo';
import { Categoria } from 'src/app/modelos/Categoria';
import { PlatillosPorCategoria } from 'src/app/modelos/PlatillosPorCategoria';

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
  public platilloPorCategoria!: PlatillosPorCategoria[];
  public platilloPorCategoriaPagina!: PlatillosPorCategoria[][];

  constructor(private menuService: MenuService, private route: ActivatedRoute) {
    this.idMenu = parseInt(this.route.snapshot.paramMap.get('menu') || '0');
    this.nombreRestaurante = 'Restaurante';
    this.platilloPorCategoria = [];
    this.menu = {
      id: 0,
      portada: '',
      tema: '',
      qr: '',
  }

  }

  ngOnInit(): void {
    this.getMenuById();
  }


  getMenuById() {
    this.menuService.getMenuById(this.idMenu).subscribe(
      (response: any) => {
        this.menu = response.menu;
        const platillos: Platillo[] = response.platillos;
        this.platilloPorCategoria = this.transformarDatos(platillos);
        this.platilloPorCategoriaPagina = this.agruparPlatillosPorPagina(this.platilloPorCategoria,5);
        this.platilloPorCategoriaPagina = this.agruparCategoriasDeCadaPagina(this.platilloPorCategoriaPagina);
     
      }
    );
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/27002.jpg';
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


}
