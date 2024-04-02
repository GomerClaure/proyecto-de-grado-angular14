import { Component, OnInit } from '@angular/core';
import { PlatillosService } from 'src/app/services/platillos/platillos.service';
import { CategoriaService } from 'src/app/services/categoriaPlatillo/categoria.service';
import { Platillo } from 'src/app/modelos/Platillo';
import { Categoria } from 'src/app/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {
  categoriaSeleccionada: string = '';
  numeroMesa:string='';
  platillos:Platillo[]=[];
  categoria:Categoria[]=[];
  categorias:any[]=[];
  storageUrl = environment.backendStorageUrl;
  constructor(private route:ActivatedRoute,private platilloService:PlatillosService,public pedidoselectService:PedidoService,private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.getPlatillos();
    this.route.queryParams.subscribe(params => {
      this.numeroMesa = params['mesaSeleccionada'];
    });
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
    console.log("Entra a Borrar")
    this.pedidoselectService.limpiarSelecciones();
  }

  AgregarPlatillo(categoria:string){
    this.pedidoselectService.agregarSeleccion(categoria);
  }
}
