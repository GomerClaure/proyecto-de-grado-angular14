import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';
import { Restaurante } from 'src/app/modelos/Restaurante';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formularioLogin: FormGroup;
  mostrarPassword: boolean = false;  

  constructor(private formBuilder: FormBuilder,
              private sessionService: SessionService, 
              private router: Router,
              private toastr: ToastrService,
              private restauranteService: RestauranteService) { 

    this.formularioLogin = this.formBuilder.group({ 
      usuario: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword; 
  }

  onSubmit() {
    if (this.formularioLogin.valid) {
      this.login();
    } else {
      this.showInfo('Por favor, complete todos los campos correctamente.');
    }
  }

  showError(message: string) {
    this.toastr.error(message, 'Error');
  }

  showInfo(message: string) {
    this.toastr.info(message, 'Información');
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Éxito');
  }

  public login() {
    const { usuario, password } = this.formularioLogin.value;
    this.sessionService.login(usuario, password).subscribe(
      res => {
        if (res) {
          console.log(res);
          let header = {
            'Authorization': 'Bearer ' + res.token,
          };
          this.showSuccess('Inicio de sesión exitoso. ¡Bienvenido a LUGO!');
              
          this.router.navigate(['/home']);
          let tipoUsuario = sessionStorage.getItem('tipo');
          if(tipoUsuario !== 'Administrador'){
            this.restauranteService.getRestaurante(header).subscribe(
              (res) => {
                console.log('Respuesta del restaurante: ' + res);
                let restaurante: Restaurante = res.restaurante;
                sessionStorage.setItem('nombre_restaurante', restaurante.nombre);
                sessionStorage.setItem('tipo_establecimiento', restaurante.tipo_establecimiento);
              },
              (error) => {
                this.showError('No se pudo obtener la información del restaurante.');
              }
            );
          }
          
        }
      },
      err => {
        console.log('Error inesperado:', err);
        if (err.status === 401) {
          console.log(err)
          this.toastr.error(err.error.message, 'Error');
        } else {
          this.toastr.error('Ocurrió un error inesperado. Por favor, intente de nuevo.', 'Error');
        }
      }
    );
  }
}
