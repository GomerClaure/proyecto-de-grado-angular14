import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';
import { MeseroGuard } from './guards/mesero.guard';
import { CajeroGuard } from './guards/cajero.guard';
import { CocineroGuard } from './guards/cocinero.guard';
import { PropietarioGuard } from './guards/propietario.guard';
import { VistaMenuComponent } from './components/vista-menu/vista-menu.component';
import { AdminGuard } from './guards/administrador.guard';

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
    loadChildren:()=>import('../app/modulos/propietario/propietario.module').then(m=> m.PropietarioModule),
    canActivate:[PropietarioGuard]
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
  },
  {
  path:'vista/:menu',
    component:VistaMenuComponent
  },
  {
    path: 'administrador',
    loadChildren: () => import('../app/modulos/administrador/administrador.module').then(m => m.AdministradorModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'empleados',
    loadChildren: () => import('../app/empleados/empleados.module').then(m => m.EmpleadosModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
