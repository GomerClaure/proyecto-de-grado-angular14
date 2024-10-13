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
    const noNavRoutes = [''];

    return !noNavRoutes.includes(this.router.url);
  }
}
