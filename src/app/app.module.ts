import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { MeseroModule } from './modulos/mesero/mesero.module';
import { HomeModule } from './modulos/home/home.module';
import { CocineroModule } from './modulos/cocinero/cocinero.module';
import { ComponentsModule } from './components/components.module';
import { CajeroModule } from './modulos/cajero/cajero.module';
import { PropietarioModule } from './modulos/propietario/propietario.module';
import { AdministradorModule} from './modulos/administrador/administrador.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
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
    CocineroModule,
    CajeroModule,
    ComponentsModule,
    PropietarioModule,
    AdministradorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

