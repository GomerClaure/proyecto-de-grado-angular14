import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/auth/session.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  requestPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private sessionService: SessionService,
              private toastr: ToastrService) {  
    this.requestPasswordForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
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
          this.toastr.success('Solicitud de cambio de contraseña enviada','Exito');
        },
        err => {
          this.toastr.error('Error al solicitar cambio de contraseña','Error');
          console.log(err);
        }
      );
    } else {
      this.toastr.info('Por favor ingrese un correo válido','Informacion');
    }
    }
  }
