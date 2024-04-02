import { Component, OnInit } from '@angular/core';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { Platillo } from 'src/app/modelos/Platillo';
import { Categoria } from 'src/app/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {
  categoriaSeleccionada: string = '';
  platillos:Platillo[]=[];
  categoria:Categoria[]=[];
  categorias:any[]=[];
  storageUrl = environment.backendStorageUrl;
  constructor(private platilloService:PlatillosService,public pedidoselectService:PedidoService,private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.getPlatillos();
  }
  getPlatillos() {
    this.platilloService.getPlatillos().subscribe(
      res => {
        this.platillos = res.platillo;
        console.log(this.platillos);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: any) => { // Ajusta el tipo de datos esperado
        this.categoria = data.categorias; // Almacena las categorías obtenidas en la variable categorias
        console.log(data)
      },
      error => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  seleccionarCategoria(categoria: string) {
    this.pedidoselectService.agregarSeleccion(categoria);
  } 

  borrarSeleccion() {
    this.categoriaSeleccionada = ''; // Borra la selección al hacer clic en el botón
  }

  AgregarPlatillo(categoria:string){
    this.pedidoselectService.agregarSeleccion(categoria);
  }
}
