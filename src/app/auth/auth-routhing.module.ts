import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { HomePageComponent } from './home-page/home-page.component';

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
