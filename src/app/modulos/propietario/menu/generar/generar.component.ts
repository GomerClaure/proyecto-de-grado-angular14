import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';
import { Platillo } from 'src/app/modelos/Platillo';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss']
})
export class GenerarComponent implements OnInit {

  public platillos: Platillo[];
  public categorias: Categoria[];
  public platillosFiltrados: Platillo[];

  constructor() {
    this.platillos = [];
    this.categorias = [];
    this.platillosFiltrados = [];
  }

  ngOnInit(): void {
    this.cargarPlatillos();
  }
  activeCategoria = 0; // Categoría activa inicialmente

  cambiarCategoria(idCategoria: number) {
    this.activeCategoria = idCategoria; // Cambia la categoría activa al hacer clic en un enlace de categoría
    if (idCategoria === 0) {
      this.platillosFiltrados = this.platillos;
    }else{
      this.platillosFiltrados = this.platillos.filter(platillo => platillo.categoria.id === idCategoria);
    }
  }

  cargarPlatillos() {
    const categorias: Categoria[] = [
      { id: 1, nombre: "Comida rápida", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
      { id: 2, nombre: "Desayunos", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
      { id: 3, nombre: "Almuerzos", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
      { id: 4, nombre: "Cenas", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
      { id: 5, nombre: "Postres", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
      { id: 6, nombre: "Bebidas", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
      { id: 7, nombre: "Snacks", imagen: "http://localhost:8000/storage/categorias/15cf2210972a9fb8c61f9a6c557e189c.jpg" },
    ];
    const imagenes = ['http://192.168.0.30:8000/storage/platillos/b7a44a65420f3efeb010b040e43ece42.webp',
     'http://192.168.0.30:8000/storage/platillos/125bfeb29dc08066308218a092f664fb.jpg',
  ];
      
    this.categorias = categorias;
    for (let i = 1; i <= 30; i++) {
      const categoriaIndex = Math.floor(Math.random() * categorias.length);
      const categoria = categorias[categoriaIndex];
      this.platillos.push({
        id: i,
        nombre: `Platillo ${i}`,
        descripcion: `Descripción del platillo ${i}`,
        precio: Math.floor(Math.random() * 100) + 50,
        imagen: Math.random() > 0.5 ? imagenes[0] : imagenes[1],
        id_menu: 1,
        categoria: { ...categoria }
      });
    }
    this.platillosFiltrados = this.platillos;
  }
}
