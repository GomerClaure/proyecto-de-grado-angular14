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
import { ListaCategoriaComponent } from './modulos/propietario/listas/lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './modulos/propietario/listas/lista-platillo/lista-platillo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPlatilloComponent } from './modulos/propietario/editar/editar-platillo/editar-platillo.component';
import { HomePageComponent } from './auth/home-page/home-page.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalEliminarComponent } from './modulos/propietario/listas/modal-eliminar/modal-eliminar.component';
import { RegistrarPedidoComponent } from './modulos/mesero/registrar-pedido/registrar-pedido.component';
import { ListaPedidosComponent } from './modulos/mesero/lista-pedidos/lista-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    RegistrarPlatilloComponent,
    RegistrarCategoriaComponent,
    RegistrarEmpleadoComponent,
    ListaCategoriaComponent,
    ListaPlatilloComponent,
    EditarPlatilloComponent,
    HomePageComponent,
    LoginComponent,
    ModalEliminarComponent,
    RegistrarPedidoComponent,
    ListaPedidosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
