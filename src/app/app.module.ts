import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './modulos/home/home.module';
import { ComponentsModule } from './components/components.module';
import { CajeroModule } from './modulos/cajero/cajero.module';
import { PropietarioModule } from './modulos/propietario/propietario.module';
import { AdministradorModule} from './modulos/administrador/administrador.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UnauthErrorInterceptor } from './interceptor/unauth-error.interceptor';

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
    ComponentsModule,
    PropietarioModule,
    AdministradorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true, 
      closeButton: true, 
    }),
    HomeModule,
    HammerModule
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthErrorInterceptor, // Este es el interceptor de manejo de errores
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

