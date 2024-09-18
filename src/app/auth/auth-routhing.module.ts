import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';

const routes:Routes=[
  {
    path:'', 
    children:[ 
      {
        path:'',
        component:HomePageComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'formulario-registro',
        component:FormRegisterComponent
      },
      {
        path:'reset-password',
        component:ResetPasswordComponent
      },
      {
        path:'request-password-reset',
        component:RequestPasswordResetComponent
      }
    ]
  } 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRouthingModule { }
