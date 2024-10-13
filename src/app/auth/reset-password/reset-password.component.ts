import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';
import { passwordsMatchValidator } from 'src/app/validators/file-validator';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private sessionService: SessionService, private toast: NgToastService,
    private router: Router) {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: passwordsMatchValidator }); // Usamos el validador importado
    this.token = '';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (this.token !== '') {
      this.resetPasswordForm.removeControl('oldPassword');
      this.resetPasswordForm.addControl('token', this.fb.control(this.token));
      this.resetPasswordForm.patchValue({ token: this.token });
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
 onSubmit() {
  this.resetPasswordForm.markAllAsTouched();

  // Verificamos si el formulario es válido
  if (this.resetPasswordForm.valid) {
    const formData = new FormData();
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      formData.append(key, this.resetPasswordForm.get(key)?.value);
    });

    // Opcional: Log para verificar los datos enviados
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.sessionService.restablecerContra(formData).subscribe(
      res => {
        this.showSuccess('Contraseña restablecida');
        if (this.token !== '') {
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.showError('Error al restablecer contraseña');
        console.log(err);
      }
    );
  } else {
    // Si el formulario no es válido, mostramos un mensaje de información
    this.showInfo('No llenaste ningún campo'); // Llama al método showInfo
  }
}


}
