import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Empleado } from 'src/app/modelos/usuario/Usuarios';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manejo-cuenta-empleado',
  templateUrl: './manejo-cuenta-empleado.component.html',
  styleUrls: ['./manejo-cuenta-empleado.component.scss']
})
export class ManejoCuentaEmpleadoComponent implements OnInit {

  usuarios: Empleado[];
  URL_BACKEND: string;
  usuarioSeleccionado: Empleado | null;
  textoBuscador: string;
  usuariosFiltrados: Empleado[];
  noHayUsuarios: boolean = false;

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
    this.sessionService.getDatosEmpleado().subscribe(
      (res) => {
        this.noHayUsuarios = res.data.length === 0;
        this.usuarios = res.data;
        this.usuariosFiltrados = [...this.usuarios];
      },
      (err) => {
        this.noHayUsuarios = true;
        console.error(err);
      }
    );
  }

  seleccionarUsuario(usuario: Empleado) {
    this.usuarioSeleccionado = usuario;
  }

  onImgError(event: any):void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/image/UsuarioCard1.png';
  }

  cambiarEstadoUsuario(idUsuario: number, estado: boolean) {
    this.sessionService.cambiarEstadoEmpleado(idUsuario+'', estado).subscribe(
      (res) => {
        let usuario = this.usuarios.find(usuario => usuario.usuario.id == idUsuario);
        if(usuario){
          usuario.usuario.estado = estado
          this.toastr.success('El estado del usuario ha sido cambiado','Exito');
        }
      },
      (err) => {
        this.toastr.error('Error al cambiar el estado del usuario','Error');
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

getTipoEmpleado(idRol: number): string {
  switch (idRol) {
    case 1:
      return 'Mesero';
    case 2:
      return 'Cajero';
    case 3:
      return 'Cocinero';
    default:
      return 'Desconocido';
  }
}
}
