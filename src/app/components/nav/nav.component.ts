import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }
  esAdministrador(): boolean {
    return sessionStorage.getItem('tipo') === 'Administrador';
  }

  esPropietario(): boolean {
    return sessionStorage.getItem('tipo') === 'Propietario';
  }

  esEmpleado(): boolean {
    return sessionStorage.getItem('tipo') === 'Empleado';
  }

  cerrarSesion() {
    this.sessionService.logout();
  }

}
