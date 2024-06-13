import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';

const routes: Routes = [ 
  {
    path:'home',
    component:HomeComponent
  },
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
  },
  {
  path:'menu',
  loadChildren:()=>import('../app/modulos/propietario/menu/menu.module').then(m=>m.MenuModule)
  },
  {
    path:'cocinero',
    loadChildren:()=>import('../app/modulos/cocinero/cocinero.module').then(m=>m.CocineroModule)
  }

];
 
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
