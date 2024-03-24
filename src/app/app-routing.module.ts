import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './auth/home-page/home-page.component';

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
  }
  
];
 
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
