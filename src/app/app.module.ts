import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { VentaComponent } from './Componentes/venta/venta.component';
import { SaldoInventarioComponent } from './Componentes/saldo-inventario/saldo-inventario.component';
import { ProductoComponent } from './Componentes/producto/producto.component';
import { ClienteComponent } from './Componentes/Personas/cliente/cliente.component';
import { UsuarioComponent } from './Componentes/Personas/usuario/usuario.component';
import { MarcaComponent } from './Componentes/marca/marca.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './Servicios/auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthInterceptorService } from './Servicios/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentaComponent,
    SaldoInventarioComponent,
    ProductoComponent,
    ClienteComponent,
    UsuarioComponent,
    MarcaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  //providers: [],
  providers: [
    AppComponent,  // Esto es para usar los metodos del componente principal desde otros componentes
    AuthGuardService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}  // Impedir problema al refrescar la pagina. Queda asi:  http://localhost:4200/#/venta
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
