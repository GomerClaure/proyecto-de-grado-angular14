import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formularioLogin: FormGroup;
  mostrarPassword: boolean = false;  // Propiedad para controlar la visibilidad de la contraseña

  constructor(private formBuilder: FormBuilder,
              private sessionService: SessionService, 
              private router: Router,
              private toast: NgToastService) { 

    this.formularioLogin = this.formBuilder.group({ 
      usuario: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;  // Alternar la visibilidad de la contraseña
  }

  onSubmit() {
    if (this.formularioLogin.valid) {
      this.login();
    } else {
      this.showInfo('Campos no válidos');
    }
  }

  showError() {
    this.toast.error({ detail: "ERROR", summary: 'Usuario no registrado', sticky: true });
  }

  showInfo(message: string) {
    this.toast.info({ detail: "INFO", summary: message, sticky: true });
  }

  showSuccess(message: string) {
    this.toast.success({ detail: message, summary: 'Success'});
  }

  public login() {
    const { usuario, password } = this.formularioLogin.value;
    this.sessionService.login(usuario, password).subscribe(
      res => {
        if (res) {
          this.showSuccess('Hecho');
          //esperar 2 segundos y redirigir a la página de inicio
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 500);
          // this.router.navigate(['/home']);
        }
      },
      err => {
        alert('Usuario o contraseña incorrectos.');
        this.showError();
      });
  }
}
