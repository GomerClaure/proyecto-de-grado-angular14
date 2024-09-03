import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token_access');
    if (token) {
      const userType = sessionStorage.getItem('tipo');
      if (userType) {
        switch (userType) {
          case 'Mesero':
            this.router.navigate(['/mesero']);
            break;
          case 'Cocinero':
            this.router.navigate(['/cocinero']);
            break;
          case 'Cajero':
            this.router.navigate(['/cajero']);
            break;
          case 'Administrador':
            this.router.navigate(['/administrador']);
            break;
          case 'Propietario':
            this.router.navigate(['/propietario']);
            break;
          default:
            this.router.navigate(['/home']); // Fallback route
            break;
        }
      }
      return false; // Prevent access to the current route
    } else {
      return true; // Allow access to the route (e.g., login page)
    }
  }
}
