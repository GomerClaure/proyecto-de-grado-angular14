import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent 
  },
  {
    path:'registrar',
    loadChildren:()=>import('../app/modulos/propietario/registro/registro.module').then(m=>m.RegistroModule)
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
