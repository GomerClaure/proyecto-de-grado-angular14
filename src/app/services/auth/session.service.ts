import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado, Propietario, Usuario } from 'src/app/modelos/usuario/Usuarios';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private BASE_URL = environment.backendUrl;

  constructor(private http: HttpClient) { }

  public login(usuario: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/login`, { usuario, password }).pipe(
      tap (res => {
        console.log(res);
        if (res) {
          let usuario: Usuario = res.user.usuario;
          sessionStorage.setItem('token_access', res.token);
          sessionStorage.setItem('id_user', usuario.id.toString());
          sessionStorage.setItem('nombre', usuario.nombre);
          sessionStorage.setItem('apellido_paterno', usuario.apellido_paterno);
          sessionStorage.setItem('apellido_materno', usuario.apellido_materno);
          sessionStorage.setItem('correo', usuario.correo);
          sessionStorage.setItem('nickname', usuario.nickname);
          sessionStorage.setItem('foto_perfil', usuario.foto_perfil);
          if (res.user.tipo === 'Administrador') {
            sessionStorage.setItem('tipo', 'Administrador');
          } else if (res.user.tipo === 'Propietario') {
            let propietario: Propietario = res.user;
            sessionStorage.setItem('id_administrador', propietario.id_administrador.toString());
            sessionStorage.setItem('id_usuario', propietario.id_usuario.toString());
            sessionStorage.setItem('id_restaurante', propietario.id_restaurante.toString());
            sessionStorage.setItem('ci', propietario.ci.toString());
            sessionStorage.setItem('fecha_registro', propietario.fecha_registro.toString());
            sessionStorage.setItem('pais', propietario.pais);
            sessionStorage.setItem('departamento', propietario.departamento);
            sessionStorage.setItem('tipo', 'Propietario');
<<<<<<< HEAD
            sessionStorage.setItem('id_restaurante', propietario.id_restaurante.toString());
=======
>>>>>>> master
          } else if (res.user.tipo === 'Empleado') {
            let empleado: Empleado = res.user;
            sessionStorage.setItem('id_empleado', empleado.id.toString());
            sessionStorage.setItem('ci', empleado.ci.toString());
            sessionStorage.setItem('fecha_nacimiento', empleado.fecha_nacimiento.toString());
            sessionStorage.setItem('fecha_contratacion', empleado.fecha_contratacion.toString());
            sessionStorage.setItem('direccion', empleado.direccion);
            sessionStorage.setItem('tipo', 'Empleado');
            sessionStorage.setItem('rol_empleado',empleado.id_rol.toString());
<<<<<<< HEAD
            sessionStorage.setItem('id_restaurante', empleado.id_restaurante.toString());
=======
>>>>>>> master
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

  public logout() {
<<<<<<< HEAD
    localStorage.clear();
=======
>>>>>>> master
    sessionStorage.clear();
    return this.http.get<any>(`${this.BASE_URL}/logout`);

  }

  getUsuario(){
    const usuario = {
      id: sessionStorage.getItem('id_empleado'),
      nombre: sessionStorage.getItem('nombre')
    };
    return usuario;
  }
  }

