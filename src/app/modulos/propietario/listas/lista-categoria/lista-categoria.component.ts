import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.scss']
})
export class ListaCategoriaComponent implements OnInit {

  categorias:Categoria[]=[];
  storageUrl = environment.backendStorageUrl;

  constructor(private router:Router,private categoriasService:CategoriaService) { 
  }
  ngOnInit(): void {
    this.getCategorias();
  }

  editarCategoria(id: number) {
    this.router.navigate(['lista/editar-platillo'], { queryParams: { platilloId: id } });
  }

  getCategorias() {
    this.categoriasService.getCategorias().subscribe(
      (data: any) => { // Ajusta el tipo de datos esperado
        this.categorias = data.categorias; // Almacena las categorías obtenidas en la variable categorias
        console.log(data)
      },
      error => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

}
