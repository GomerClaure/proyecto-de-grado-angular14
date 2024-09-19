import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private sessionService: SessionService, private toast: NgToastService) {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: passwordsMatchValidator }); // Usamos el validador importado
    this.token = '';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
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
    if (this.resetPasswordForm.valid) {
      this.sessionService.restablecerContra(this.resetPasswordForm.value).subscribe(
        res => {
          this.showSuccess('Contraseña restablecida');
        },
        err => {
          this.showError('Error al restablecer contraseña');
          console.log(err);
        }
      );
      console.log(this.resetPasswordForm.value);
    }
  }
}
