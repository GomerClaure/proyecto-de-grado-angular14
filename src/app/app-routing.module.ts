import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
import { LoginGuard } from './guards/login.guard';
import { AuthActiveGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthActiveGuard]
  },
  {
    path: '',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'registrar',
    loadChildren: () => import('../app/modulos/propietario/registro/registro.module').then(m => m.RegistroModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'lista',
    loadChildren: () => import('../app/modulos/propietario/listas/listas.module').then(m => m.ListasModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'mesero',
    loadChildren: () => import('../app/modulos/mesero/mesero.module').then(m => m.MeseroModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('../app/modulos/propietario/menu/menu.module').then(m => m.MenuModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'cocinero',
    loadChildren: () => import('../app/modulos/cocinero/cocinero.module').then(m => m.CocineroModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'cajero',
    loadChildren: () => import('../app/modulos/cajero/cajero.module').then(m => m.CajeroModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'notificacion',
    loadChildren: () => import('../app/modulos/notificacion/notificacion.module').then(m => m.NotificacionModule),
    //canActivate: [LoginGuard]
  },
  {
    path: 'reporte',
    loadChildren: () => import('../app/modulos/propietario/reporte/reporte.module').then(m => m.ReporteModule),
    //canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
