import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  requestPasswordForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.requestPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.message = '';
  }

  onSubmit() {
    if (this.requestPasswordForm.valid) {
      const email = this.requestPasswordForm.value.email;
      this.http.post('/solicitar-cambio-contrasena', { email }).subscribe(
        (response: any) => {
          this.message = 'Hemos enviado un enlace de restablecimiento a tu correo electrónico.';
        },
        (error) => {
          console.error('Error al solicitar el cambio de contraseña', error);
        }
      );
    }
  }
}