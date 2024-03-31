import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private sessionService: SessionService,private router:Router) { }

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

  mostrarModalCategoria(): void {
    console.log("modal");
    this.router.navigateByUrl('/registrar/categoria');
  }
 
} 

 