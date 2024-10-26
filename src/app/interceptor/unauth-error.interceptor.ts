import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SessionService } from '../services/auth/session.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket/websocket.service';

@Injectable()
export class UnauthErrorInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService, private router: Router,
    private webSocketService: WebsocketService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si es un error 401 (no autorizado)
        if (error.status === 401) {
          console.log("Error 401 detectado: Redirigiendo a login");
          // Llamamos al método de logout
          this.webSocketService.closeConnection();
          this.sessionService.logout();
          // Redirigir al usuario a la página de login
          this.router.navigate(['/login']);
        }

        // Retornar el error para que otros interceptores puedan manejarlo o la app lo maneje
        return throwError(() => error);
      })
    );
  }

}
