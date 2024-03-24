import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado, Propietario, Usuario } from 'src/app/modelos/usuario/Usuarios';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private BASE_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  public login(user: string, passwprd: string) {
    return this.http.post<any>(`${this.BASE_URL}/login`, { user, passwprd }).pipe(
      tap (res => {
        if (res) {
          let usuario: Usuario = res.data.usuario;
          localStorage.setItem('token', usuario.access_token);
          localStorage.setItem('id_user', usuario.id.toString());
          localStorage.setItem('nombre', usuario.nombre);
          localStorage.setItem('apellido_paterno', usuario.apellido_paterno);
          localStorage.setItem('apellido_materno', usuario.apellido_materno);
          localStorage.setItem('correo', usuario.correo);
          localStorage.setItem('nickname', usuario.nickname);
          localStorage.setItem('foto_perfil', usuario.foto_perfil);
          if (res.usuario.tipo === 'Administrador') {
            localStorage.setItem('tipo', 'Administrador');
          } else if (res.usuario.tipo === 'Propietario') {
            let propietario: Propietario = res.data;
            localStorage.setItem('id_administrador', propietario.id_administrador.toString());
            localStorage.setItem('id_usuario', propietario.id_usuario.toString());
            localStorage.setItem('id_restaurante', propietario.id_restaurante.toString());
            localStorage.setItem('ci', propietario.ci.toString());
            localStorage.setItem('fecha_registro', propietario.fecha_registro.toString());
            localStorage.setItem('pais', propietario.pais);
            localStorage.setItem('departamento', propietario.departamento);
            localStorage.setItem('tipo', 'Propietario');
          } else if (res.usuario.tipo === 'Empleado') {
            let empleado: Empleado = res.data;
            localStorage.setItem('ci', empleado.ci.toString());
            localStorage.setItem('fecha_nacimiento', empleado.fecha_nacimiento.toString());
            localStorage.setItem('fecha_contratacion', empleado.fecha_contratacion.toString());
            localStorage.setItem('direccion', empleado.direccion);
            localStorage.setItem('tipo', 'Empleado');
          }
        }
        // return {message: 'Inicio de sesión exitoso.'}
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }
}
