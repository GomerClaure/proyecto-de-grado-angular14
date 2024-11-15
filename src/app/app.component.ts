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
    // Rutas en las que no se mostrará el nav
    const noNavRoutes = ['/propietario/plantilla-pedidos','/vista/4','/vista/5','/vista/6',
      '/vista/2','/vista/3','/vista/1'];
    return !noNavRoutes.includes(this.router.url);
  }
}
