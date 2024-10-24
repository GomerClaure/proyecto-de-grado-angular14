import { Component, Input, OnChanges} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
              private toastr:ToastrService) { 
                this.categoria = {} as Categoria;
              }

  ngOnChanges(): void {
    console.log(this.categoria)

  }
  eliminarCategoria(){ 
   this.categoriaService.deleteCategoria(this.categoria.id).subscribe(
    res => {
      this.categoriaService.categoriaEvento('eliminar', res.categoria);
      this.toastr.success('Categoria eliminada correctamente','Exito');
    },
    err => {
      console.log(err);
      this.toastr.error('La categoria no se pudo eliminar','Error');
    }
  );
  }
}
