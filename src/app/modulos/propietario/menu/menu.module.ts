import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { GenerarComponent } from './generar/generar.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { VisualizarQrComponent } from './visualizar-qr/visualizar-qr.component';
import { PlantillaQrComponent } from './plantilla-qr/plantilla-qr.component';
import { VistaMenuComponent } from './vista-menu/vista-menu.component';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [
    GenerarComponent,
    VisualizarQrComponent,
    PlantillaQrComponent,
    VistaMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ComponentsModule,
    FormsModule,
    NgToastModule
  ]
})
export class MenuModule { }
