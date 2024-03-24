import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { HomePageComponent } from './auth/home-page/home-page.component';

=======
import { HomeComponent } from './modulos/home/home.component';
import { LoginComponent } from './auth/login/login.component';
>>>>>>> 337fe402b7b833b804c0fc8648099da038427d5d
const routes: Routes = [
  {
    path:'',
    //component:HomePageComponent,
    loadChildren:()=>import('../app/auth/auth.module').then(m=>m.AuthModule)
  },
  { 
    path:'registrar',
    loadChildren:()=>import('../app/modulos/propietario/registro/registro.module').then(m=>m.RegistroModule)
  }, 
  {
    path:'lista',
    loadChildren:()=>import('../app/modulos/propietario/listas/listas.module').then(m=>m.ListasModule)
  },{
  path: 'login',
  loadChildren: () => import('../app/auth/login/login.component').then(m => m.LoginComponent)
  }
];
 
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
