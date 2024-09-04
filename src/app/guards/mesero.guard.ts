import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeseroGuard implements CanActivate {
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token_access');
    const userType = sessionStorage.getItem('rol_empleado');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userType === '1') {
      return true;
    } else {
      this.router.navigate(['/home']); 
      return false;
    }
  }
}
