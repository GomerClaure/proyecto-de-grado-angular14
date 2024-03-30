import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';

const routes: Routes = [ 
  {
    path:'',
    loadChildren:()=>import('../app/auth/auth.module').then(m=>m.AuthModule)
  },
  { 
    path:'registrar',
    loadChildren:()=>import('../app/modulos/propietario/registro/registro.module').then(m=>m.RegistroModule)
  }, 
  {
    path:'lista',
    loadChildren:()=>import('../app/modulos/propietario/listas/listas.module').then(m=>m.ListasModule)
  },
  {
  path:'home',
  component:HomeComponent
  },
  {
    path:'mesero',
    loadChildren:()=>import('../app/modulos/mesero/mesero.module').then(m=>m.MeseroModule)
    
  }

];
 
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
