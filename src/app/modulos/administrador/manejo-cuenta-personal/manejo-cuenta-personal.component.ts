import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Propietario } from 'src/app/modelos/usuario/Usuarios';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(private sessionService: SessionService, private sanitizer: DomSanitizer,
    private toast: NgToastService
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

  getSanitizedImageUrl(fotoPerfil: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.URL_BACKEND + fotoPerfil);
  }

  onImgError(event: any) {
    event.target.src = 'assets/image/Usuario.jpg';
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
            // usuario.usuario.estado.toString().includes(this.textoBuscador) ||
        );
    }
}

  showError(message: string) {
    this.toast.error({ detail: "ERROR", summary: message, sticky: true });
  }

  showInfo(message: string) {
    this.toast.info({ detail: "INFO", summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message });

  }
}
