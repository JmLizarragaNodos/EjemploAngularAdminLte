import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { VentaComponent } from './Componentes/venta/venta.component';
import { SaldoInventarioComponent } from './Componentes/saldo-inventario/saldo-inventario.component';
import { ProductoComponent } from './Componentes/producto/producto.component';
import { ClienteComponent } from './Componentes/Personas/cliente/cliente.component';
import { UsuarioComponent } from './Componentes/Personas/usuario/usuario.component';
import { MarcaComponent } from './Componentes/marca/marca.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
