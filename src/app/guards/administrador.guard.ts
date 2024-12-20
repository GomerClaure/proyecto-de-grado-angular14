import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('token_access');
    const userType = sessionStorage.getItem('tipo');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userType === 'Administrador') { 
      return true;
    } else {
      this.router.navigate(['/home']); 
      return false;
    }
  }
}
