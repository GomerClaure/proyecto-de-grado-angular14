import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empleado, Propietario, Usuario } from 'src/app/modelos/usuario/Usuarios';
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatusSubject.asObservable();
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token_access');
  }

  public login(usuario: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/login`, { usuario, password }).pipe(
      tap(res => {
        console.log(res);
        if (res) {
          let usuario: Usuario = res.user.usuario;
          // sessionStorage.setItem('token_access', res.token);
          this.setToken(res.token);
          sessionStorage.setItem('id_user', usuario.id.toString());
          sessionStorage.setItem('nombre', usuario.nombre);
          sessionStorage.setItem('apellido_paterno', usuario.apellido_paterno);
          sessionStorage.setItem('apellido_materno', usuario.apellido_materno);
          sessionStorage.setItem('correo', usuario.correo);
          sessionStorage.setItem('nickname', usuario.nickname);
          sessionStorage.setItem('foto_perfil', usuario.foto_perfil);
          sessionStorage.setItem('tipo', usuario.tipo_usuario);
          if (usuario.tipo_usuario === 'Propietario') {
            let propietario: Propietario = res.user;
            sessionStorage.setItem('id_administrador', propietario.id_administrador.toString());
            sessionStorage.setItem('id_propietario', propietario.id.toString());
            sessionStorage.setItem('id_restaurante', propietario.id_restaurante.toString());
            sessionStorage.setItem('ci', propietario.ci.toString());
            sessionStorage.setItem('fecha_registro', propietario.fecha_registro.toString());
            sessionStorage.setItem('pais', propietario.pais);
            sessionStorage.setItem('departamento', propietario.departamento);
            sessionStorage.setItem('id_restaurante', propietario.id_restaurante.toString());
          } else if (usuario.tipo_usuario === 'Empleado') {
            let empleado: Empleado = res.user;
            sessionStorage.setItem('id_empleado', empleado.id.toString());
            sessionStorage.setItem('ci', empleado.ci.toString());
            sessionStorage.setItem('fecha_nacimiento', empleado.fecha_nacimiento.toString());
            sessionStorage.setItem('fecha_contratacion', empleado.fecha_contratacion.toString());
            sessionStorage.setItem('direccion', empleado.direccion);
            sessionStorage.setItem('rol_empleado', empleado.id_rol.toString());
            sessionStorage.setItem('id_restaurante', empleado.id_restaurante.toString());
          }
        }
        this.authStatusSubject.next(true);
      }),
    );
  }

  public logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.authStatusSubject.next(false);
    return this.http.get<any>(`${this.BASE_URL}/logout`);

  }

  public setToken(token: string) {
    this.token = token;
    this.headers = {
      'Authorization': 'Bearer ' + token,
    };
    sessionStorage.setItem('token_access', token);
  }

  public getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token_access');
  }

  getUsuario() {
    const usuario = {
      id: sessionStorage.getItem('id_empleado') || '',
      nombre: sessionStorage.getItem('nombre') || ''
    };
    return usuario;
  }

  actualizarDatosUsuario(usuarioForm: FormData) {
    console.log(usuarioForm);
    return this.http.post<any>(`${this.BASE_URL}/actualizar/datos-personales`, usuarioForm, { headers: this.headers });
  }

  actualizarDatosEmpleado(empleadoForm: FormData) {
    console.log(empleadoForm);
    return this.http.post<any>(`${this.BASE_URL}/actualizar/datos-empleado`, empleadoForm, { headers: this.headers });
  }


  cambiarEstadoEmpleado(idEmpleado: string, estado: boolean) {
    var ruta = '/empleado/dar-baja/';
    if (estado) {
      ruta = '/empleado/dar-alta/';
    }
    return this.http.put<any>(`${this.BASE_URL}${ruta}${idEmpleado}`, null, { headers: this.headers });
  }

  getDatosEmpleado() {
    return this.http.get<any>(`${this.BASE_URL}/empleados`, { headers: this.headers });
  }


  getDatosPersonales(id_usuario: string) {
    const params = new HttpParams().set('id_usuario', id_usuario);
    return this.http.get<any>(`${this.BASE_URL}/datos-personales`, { headers: this.headers, params });
  }

  getDatosPersonalesPropietarios() {
    return this.http.get<any>(`${this.BASE_URL}/propietarios`, { headers: this.headers });
  }

  cambiarEstadoUsuario(id_usuario: string, estado: boolean) {
    var ruta = '/propietario/dar-baja';
    if (estado) {
      ruta = '/propietario/dar-alta';
    }
    return this.http.put<any>(`${this.BASE_URL}${ruta}/${id_usuario}`, null, { headers: this.headers });
  }

  restablecerContra(contraseniaForm: FormData) {
    // mostrar Datos de contraseniaForm
    console.log(contraseniaForm);
    var direccion = `${this.BASE_URL}/restablecer-contrasenia`;
    if (contraseniaForm.get('token')) {
      direccion = `${this.BASE_URL}/restablecer-contrasenia-olvidada`;
    }

    return this.http.post<any>(direccion, contraseniaForm, { headers: this.headers });
  }

  solicitarCambioContra(solicitudForm: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/solicitar-cambio-contrasenia`, solicitudForm);
  }

}