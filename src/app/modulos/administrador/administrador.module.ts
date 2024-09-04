import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ComponentsModule } from "../../components/components.module";
import { DetalleComponent } from './solicitudes/detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SolicitudesComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
]
})
export class AdministradorModule { }
