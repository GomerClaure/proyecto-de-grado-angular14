import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/auth/session.service';
import { environment } from 'src/environments/environment';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  requestPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private sessionService: SessionService,
    private toast: NgToastService) {  
    this.requestPasswordForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
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

  onSubmit() {
    if (this.requestPasswordForm.valid) {
      const direccion_frontend = environment.frontDominio+'/reset-password';
      const formData = new FormData();
      formData.append('correo', this.requestPasswordForm.get('correo')?.value);
      formData.append('direccion_frontend', direccion_frontend);
      this.sessionService.solicitarCambioContra(formData).subscribe(
        res => {
          console.log(res);
          this.showSuccess('Solicitud de cambio de contraseña enviada');
        },
        err => {
          this.showError('Error al solicitar cambio de contraseña');
          console.log(err);
        }
      );
    }
  }
}