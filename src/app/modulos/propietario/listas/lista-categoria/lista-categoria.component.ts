import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.scss']
})
export class ListaCategoriaComponent implements OnInit {
 
  categorias:Categoria[]=[];
  storageUrl = environment.backendStorageUrl;
  id_restaurante:any;
  categoriaSeleccionada: Categoria;
  noHayCategorias:boolean;

  constructor(private categoriasService:CategoriaService) { 
      this.categoriaSeleccionada = {} as Categoria;
      this.noHayCategorias = false;
  }
  
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/image/Imagen-rota.jpg'; // URL de la imagen de reemplazo
  }

  ngOnInit(): void {
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
    this.getCategorias();
    this.suscribirEventos();
  }

  seleccionarCategoria(id:number){
    this.categoriaSeleccionada = this.categorias.find(categoria => categoria.id === id) || {} as Categoria;
    console.log(this.categoriaSeleccionada)
  }
  
  getCategorias() {
    this.categoriasService.getCategorias(this.id_restaurante).subscribe(
      (data: any) => { // Ajusta el tipo de datos esperado
        this.noHayCategorias = data.categorias.length === 0;
        this.categorias = data.categorias; // Almacena las categorías obtenidas en la variable categorias
        console.log(data)
      },
      error => {
        this.noHayCategorias = true;
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  suscribirEventos(){
    this.categoriasService.getCategoriaEventos().subscribe(evento => {
      if (evento) {
        switch (evento.accion) {
          case 'crear':
            this.categorias.push(evento.categoria);
            break;
          case 'editar':
            this.categorias = this.categorias.map(categoria => 
              categoria.id === evento.categoria.id ? evento.categoria : categoria
            ); 
            break;
          case 'eliminar':
            this.categorias = this.categorias.filter(categoria => categoria.id !== evento.categoria.id); // Eliminar categoría
            break;
        }
      }
    });
  }

}
