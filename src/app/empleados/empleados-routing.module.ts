import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDatosPersonalesComponent } from './form-datos-personales/form-datos-personales.component';

const routes: Routes = [
  { path: 'datos-personales', component: FormDatosPersonalesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
