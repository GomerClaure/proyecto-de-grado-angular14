import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Categoria } from 'src/app/modelos/Categoria';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';

@Component({
  selector: 'app-modal-eliminar-categoria',
  templateUrl: './modal-eliminar-categoria.component.html',
  styleUrls: ['./modal-eliminar-categoria.component.scss']
})
export class ModalEliminarCategoriaComponent implements OnChanges {
  showModal=false;
  @Input() categoria: Categoria;  

  constructor(private categoriaService:CategoriaService,
              private toast:NgToastService) { 
                this.categoria = {} as Categoria;
              }

  ngOnChanges(): void {
    console.log(this.categoria)

  }
  
  eliminarCategoria(){ 
   this.categoriaService.deleteCategoria(this.categoria.id).subscribe(
    res => {
      this.categoriaService.categoriaEvento('eliminar', res.categoria);
      console.log('aqui')
    },
    err => {
      console.log(err);
      this.toast.error({detail:"ERROR",summary:'La categoria no se pudo eliminar',sticky:true});
    }
  );
  }
}
