import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
import { MeseroGuard } from './guards/mesero.guard';
import { CajeroGuard } from './guards/cajero.guard';
import { CocineroGuard } from './guards/cocinero.guard';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'propietario',
    loadChildren:()=>import('../app/modulos/propietario/propietario.module').then(m=> m.PropietarioModule)
  },
  {
    path: 'mesero',
    loadChildren: () => import('../app/modulos/mesero/mesero.module').then(m => m.MeseroModule),
    canActivate: [MeseroGuard]
  },
  {
    path: 'cocinero',
    loadChildren: () => import('../app/modulos/cocinero/cocinero.module').then(m => m.CocineroModule),
    canActivate: [CocineroGuard]
  },
  {
    path: 'cajero',
    loadChildren: () => import('../app/modulos/cajero/cajero.module').then(m => m.CajeroModule),
    canActivate: [CajeroGuard]
  },
  {
    path: 'notificacion',
    loadChildren: () => import('../app/modulos/notificacion/notificacion.module').then(m => m.NotificacionModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
