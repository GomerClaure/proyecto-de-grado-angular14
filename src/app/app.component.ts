import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lugo';
  constructor(private router: Router) {}

  shouldShowNav(): boolean {
    const noNavRoutes = ['/propietario/plantilla-pedidos'];
    const url = this.router.url;
  
    // Oculta nav si está en la lista exacta o si la ruta comienza con "/vista/"
    return !(
      noNavRoutes.includes(url) ||
      url.startsWith('/vista/')
    );
  }
}
