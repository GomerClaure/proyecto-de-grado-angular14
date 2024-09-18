import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { passwordsMatchValidator } from 'src/app/validators/file-validator';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string;
  token: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: passwordsMatchValidator }); // Usamos el validador importado
    this.message = '';
    this.token = '';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.resetPasswordForm.markAllAsTouched();
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    }
  }
}
