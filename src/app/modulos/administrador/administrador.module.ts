import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ComponentsModule } from "../../components/components.module";
import { DetalleComponent } from './solicitudes/detalle/detalle.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { ManejoCuentaPersonalComponent } from './manejo-cuenta-personal/manejo-cuenta-personal.component';



@NgModule({
  declarations: [
    SolicitudesComponent,
    DetalleComponent,
    ManejoCuentaPersonalComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgToastModule,
    FormsModule
]
})
export class AdministradorModule { }
