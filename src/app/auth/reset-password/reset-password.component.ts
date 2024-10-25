import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';
import { passwordsMatchValidator } from 'src/app/validators/file-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private sessionService: SessionService, 
              private toastr: ToastrService,
              private router: Router) {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: passwordsMatchValidator }); 
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
  onSubmit() {
    this.resetPasswordForm.markAllAsTouched();
  
    if (this.resetPasswordForm.valid) {
      const formData = new FormData();
      Object.keys(this.resetPasswordForm.controls).forEach(key => {
        formData.append(key, this.resetPasswordForm.get(key)?.value);
      });
  
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      this.sessionService.restablecerContra(formData).subscribe(
        res => {
          this.toastr.success('Contraseña restablecida', 'Éxito');
          if (this.token !== '') {
            this.router.navigate(['/login']);
          }
          this.resetPasswordForm.reset();
        },
        err => {
          this.toastr.error('Error al restablecer contraseña', 'Error');
          console.log(err);
        }
      );
    } else {
      this.toastr.info('No llenaste ningún campo', 'Información'); 
    }
  }
}
