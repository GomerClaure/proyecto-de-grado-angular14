import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Propietario } from 'src/app/modelos/usuario/Usuarios';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-manejo-cuenta-personal',
  templateUrl: './manejo-cuenta-personal.component.html',
  styleUrls: ['./manejo-cuenta-personal.component.scss']
})
export class ManejoCuentaPersonalComponent implements OnInit {

  usuarios: Propietario[];
  URL_BACKEND: string;
  usuarioSeleccionado: Propietario | null = null;

  constructor(private sessionService: SessionService, private sanitizer: DomSanitizer) {
    this.usuarios = [];
    this.URL_BACKEND = environment.backendStorageUrl;
  }

  ngOnInit(): void {
    this.sessionService.getDatosPersonalesPropietarios().subscribe(
      (res) => {
        this.usuarios = res.data;
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

    event.target.src = this.sanitizer.bypassSecurityTrustUrl('assets/image/27002.jpg'); // URL de imagen de reemplazo
  }
}
