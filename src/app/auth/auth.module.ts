import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthRouthingModule } from './auth-routhing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    FormRegisterComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    AuthRouthingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
