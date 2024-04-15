import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';
import { Platillo } from 'src/app/modelos/Platillo';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { Menu } from 'src/app/modelos/Menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss']
})
export class GenerarComponent implements OnInit {

  public platillos: Platillo[];
  public categorias: Categoria[];
  public platillosFiltrados: Platillo[];
  public menu!: Menu;
  public imgPortada: string;
  public selectedFile: File;
  public tema: string;
  public baseUrl = environment.backendStorageUrl;

  constructor(private menuService: MenuService, private categoriaService: CategoriaService) {
    this.platillos = [];
    this.categorias = [];
    this.platillosFiltrados = [];
    this.selectedFile = new File([''], '');
    this.imgPortada = 'assets/image/27002.jpg';
    this.tema = 'light-theme';
    // this.themeSwitch = new ElementRef(null);
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarPlatillos();
  }
  activeCategoria = 0; // Categoría activa inicialmente

  cambiarCategoria(idCategoria: number) {
    this.activeCategoria = idCategoria; // Cambia la categoría activa al hacer clic en un enlace de categoría
    if (idCategoria === 0) {
      this.platillosFiltrados = this.platillos;
    } else {
      this.platillosFiltrados = this.platillos.filter(platillo => platillo.categoria.id === idCategoria);
    }
  }

  cargarPlatillos() {
    this.menuService.getMenu().subscribe(
      res => {
        console.log(res.platillos);
        this.menu = res.menu;
        this.tema = this.menu.tema;
        let checkSwitch = document.getElementById('themeSwitch');
        if (checkSwitch && this.tema === 'dark-theme') checkSwitch.click();
        let collapse = document.getElementById('collapseImgPortada');
        if (collapse && this.menu.portada!='') 
          collapse.classList.add('show');
          this.imgPortada = this.baseUrl+this.menu.portada;
        this.platillos = res.platillos;
        this.platillosFiltrados = this.platillos;
        
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarCategorias() {
    console.log('Cargando categorías');
    this.categoriaService.getCategorias().subscribe(
      (res: any) => {
        this.categorias = res.categorias;
        console.log('Categorías cargadas---');
      },
      err => {
        console.log(err);
      }
    );
    }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgPortada = e.target.result;
        let collapse = document.getElementById('collapseImgPortada');

        if (collapse && !collapse.classList.contains('show')) collapse.classList.add('show');
      };
      reader.readAsDataURL(file);
    }
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/27002.jpg';
  }

  cambiarTema(event: any) {
    const switchValue = event.target.checked;
    console.log(switchValue);
    let body = document.getElementById('body-generar-menu');
    if (switchValue) {
      this.tema = 'dark-theme';
      body?.classList.add(this.tema);
    } else {
      this.tema = 'light-theme';
      // Cambiar a tema claro
      body?.classList.remove('dark-theme');
    }
  }

  cambiarDisponibilidadPlato(event: any, idPlato: number) {
    const index = this.platillos.findIndex(platillo => platillo.id === idPlato);
    if (index !== -1) {
      const platillo = this.platillos[index]; // Obtiene el platillo usando el índice
      platillo.plato_disponible_menu = false;
    }

    }

    guardarMenu() {
      const formData = new FormData();
      console.log(this.selectedFile);
      if (this.selectedFile.size > 0)
        console.log('Imagen seleccionada');
        formData.append('portada', this.selectedFile);
      formData.append('tema', this.tema);
      formData.append('platillos', JSON.stringify(this.platillos));
      formData.append('id_menu', this.menu.id.toString());
      console.log('Guardando menú');
      this.menuService.saveMenu(formData).subscribe(
        res => {
          console.log(res);
          alert('Menú guardado');
        },
        err => {
          console.log(err);
        }
      );
      
    }

  }