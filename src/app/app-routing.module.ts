import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
import { PropietarioGuard } from './guards/propietario.guard';
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
    path: 'registrar',
    loadChildren: () => import('../app/modulos/propietario/registro/registro.module').then(m => m.RegistroModule),
    canActivate: [PropietarioGuard]
  },
  {
    path: 'lista',
    loadChildren: () => import('../app/modulos/propietario/listas/listas.module').then(m => m.ListasModule),
    canActivate: [PropietarioGuard]
  },
  {
    path: 'mesero',
    loadChildren: () => import('../app/modulos/mesero/mesero.module').then(m => m.MeseroModule),
    canActivate: [MeseroGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('../app/modulos/propietario/menu/menu.module').then(m => m.MenuModule),
    canActivate: [PropietarioGuard]
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
    //canActivate: [LoginGuard]
  },
  {
    path: 'reporte',
    loadChildren: () => import('../app/modulos/propietario/reporte/reporte.module').then(m => m.ReporteModule),
    canActivate: [PropietarioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
