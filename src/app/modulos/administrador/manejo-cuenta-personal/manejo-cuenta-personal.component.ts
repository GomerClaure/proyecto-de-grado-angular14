import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Propietario } from 'src/app/modelos/usuario/Usuarios';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manejo-cuenta-personal',
  templateUrl: './manejo-cuenta-personal.component.html',
  styleUrls: ['./manejo-cuenta-personal.component.scss']
})
export class ManejoCuentaPersonalComponent implements OnInit {

  usuarios: Propietario[];
  URL_BACKEND: string;
  usuarioSeleccionado: Propietario | null;
  textoBuscador: string;
  usuariosFiltrados: Propietario[];

  constructor(private sessionService: SessionService, 
              private toastr:ToastrService
  ) {
    this.usuarios = [];
    this.URL_BACKEND = environment.backendStorageUrl;
    this.usuarioSeleccionado = null;
    this.usuariosFiltrados = [];
    this.textoBuscador = '';
  }

  ngOnInit(): void {
    this.sessionService.getDatosPersonalesPropietarios().subscribe(
      (res) => {
        this.usuarios = res.data;
        this.usuariosFiltrados = [...this.usuarios];
      },
      (err) => {
        console.error(err);
      }
    );
  }
  seleccionarUsuario(usuario: Propietario) {
    this.usuarioSeleccionado = usuario;
  }
  onImgError(event: any):void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/image/UsuarioCard1.png';
  }
  cambiarEstadoUsuario(idUsuario: number, estado: boolean) {
    this.sessionService.cambiarEstadoUsuario(idUsuario+'', estado).subscribe(
      (res) => {
        let usuario = this.usuarios.find(usuario => usuario.id_usuario == idUsuario);
        if(usuario){
          usuario.usuario.estado = estado
          this.showSuccess('El estado del usuario ha sido cambiado');
        }
      },
      (err) => {
        this.showError('Error al cambiar el estado del usuario');
        console.error(err);
      }
    );
  }
  onSearchChange(searchValue: string): void {
    this.textoBuscador = searchValue.trim().toLowerCase();
    this.filtrarUsuarios();
  }
  filtrarUsuarios(): void {
    console.log(this.textoBuscador);
    
    if (this.textoBuscador === '') {
        // Si el buscador está vacío, mostrar todos los usuarios
        this.usuariosFiltrados = [...this.usuarios];
    } else {
      console.log(this.usuarios);
        // Filtrar los usuarios que coinciden con el texto del buscador incluido activo o inactivo
        this.usuariosFiltrados = this.usuarios.filter(usuario =>
            usuario.usuario.nombre.toLowerCase().includes(this.textoBuscador) ||
            usuario.usuario.apellido_paterno?.toLowerCase().includes(this.textoBuscador) ||
            usuario.usuario.apellido_materno?.toLowerCase().includes(this.textoBuscador) 
        );
    }
  }
  showError(message: string) {
    this.toastr.error(message,'Error');
  }
  showInfo(message: string) {
    this.toastr.info(message,'Informacion');
  }
  showSuccess(message: string) {
    this.toastr.success(message,'Exito');
  }
}
