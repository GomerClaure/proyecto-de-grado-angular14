import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ComponentsModule } from "../../components/components.module";



@NgModule({
  declarations: [
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    ComponentsModule
]
})
export class AdministradorModule { }
