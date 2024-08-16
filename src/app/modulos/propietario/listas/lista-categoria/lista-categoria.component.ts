import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ModalEditarCategoriaService } from 'src/app/services/modales/modal-editar-categoria.service';
import { ModalEliminarCategoriaService } from 'src/app/services/modales/modal-eliminar-categoria.service';


@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.scss']
})
export class ListaCategoriaComponent implements OnInit {

  categorias:Categoria[]=[];
  storageUrl = environment.backendStorageUrl;
<<<<<<< HEAD
  id_restaurante:any;
=======
>>>>>>> master

  constructor(private router:Router,private categoriasService:CategoriaService,
    private modalEditarCategoriaService:ModalEditarCategoriaService,
    private modalService:ModalEliminarCategoriaService) { 
  }
  ngOnInit(): void {
<<<<<<< HEAD
    //sacamos el id del restaurante para solo mostrar categorias de ese restaurante
    this.id_restaurante=parseInt(sessionStorage.getItem('id_restaurante')||'0');
=======
>>>>>>> master
    this.getCategorias();
    this.modalEditarCategoriaService.getModalClosed().subscribe(closed => {
      if (closed) {
        console.log('Modal cerrado:', closed);
        // Recargar la lista de categorías
        window.location.reload();
        // Poner modalClosed a false después de recargar la lista de categorías
        this.modalEditarCategoriaService.setModalClosed(false);
      }
    });
  }

  editarCategoria(id: number) {
    let categoria = this.categorias.find(categoria => categoria.id == id) 
    || {id: 0, nombre: '', imagen: ''};
    this.modalEditarCategoriaService.openModal(categoria);
  }

  eliminarCategoria(id:number){
   this.modalService.openModal(id,this.categorias);
  } 

  getCategorias() {
<<<<<<< HEAD
    this.categoriasService.getCategorias(this.id_restaurante).subscribe(
=======
    this.categoriasService.getCategorias().subscribe(
>>>>>>> master
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
