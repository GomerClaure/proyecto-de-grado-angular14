import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthRouthingModule } from './auth-routhing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastComponent, NgToastModule } from 'ng-angular-popup';
import { PasoUnoComponent } from './form-register/primer-paso/paso-uno/paso-uno.component';
import { PasoDosComponent } from './form-register/segundo-paso/paso-dos/paso-dos.component';
import { PasoTresComponent } from './form-register/tercer-paso/paso-tres/paso-tres.component';

@NgModule({
  declarations: [
    LoginComponent,
    FormRegisterComponent,
    HomePageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    AuthRouthingModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgToastModule
  ]
})
export class AuthModule { }
