import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { ModalEliminarCategoriaService } from 'src/app/services/modales/modal-eliminar-categoria.service';

@Component({
  selector: 'app-modal-eliminar-categoria',
  templateUrl: './modal-eliminar-categoria.component.html',
  styleUrls: ['./modal-eliminar-categoria.component.scss']
})
export class ModalEliminarCategoriaComponent implements OnInit {
  showModal=false;

  constructor(private categoriaService:CategoriaService,
              private modalService:ModalEliminarCategoriaService,
              private toast:NgToastService) { }

  ngOnInit(): void {
  }
  
  eliminarCategoria(){ 
   console.log("Categoria eliminada"+this.modalService.idCategoriaModal());
   this.categoriaService.deleteCategoria(this.modalService.idCategoriaModal()).subscribe(
    res => {
      console.log(this.modalService.listaCategorias());
      this.modalService.listaCategorias()
        .splice(this.modalService.listaCategorias()
          .findIndex(categoria => categoria.id === this.modalService.idCategoriaModal()), 1);
      console.log(res);
      this.toast.success({ detail:'Categoria eliminada', summary: 'Success', duration: 1000});
      console.log('aqui')
    },
    err => {
      console.log(err);
      this.toast.error({detail:"ERROR",summary:'La categoria no se pudo eliminar',sticky:true});
    }
  );
  }
}
