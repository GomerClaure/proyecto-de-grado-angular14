import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './modulos/home/home.component';
import { RegistrarPlatilloComponent } from './modulos/propietario/registro/registrar-platillo/registrar-platillo.component';
import { RegistrarCategoriaComponent } from './modulos/propietario/registro/registrar-categoria/registrar-categoria.component';
import { RegistrarEmpleadoComponent } from './modulos/propietario/registro/registrar-empleado/registrar-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    RegistrarPlatilloComponent,
    RegistrarCategoriaComponent,
    RegistrarEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
