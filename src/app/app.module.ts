import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { MeseroModule } from './modulos/mesero/mesero.module';
import { CocineroModule } from './modulos/cocinero/cocinero.module';
import { HomeModule } from './modulos/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    //EditarCategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    MeseroModule,
    HomeModule,
    CocineroModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
