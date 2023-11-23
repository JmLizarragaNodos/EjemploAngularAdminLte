import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { MarcaComponent } from './Componentes/marca/marca.component';
import { ProductoComponent } from './Componentes/producto/producto.component';
import { UsuarioComponent } from './Componentes/Personas/usuario/usuario.component';
import { ClienteComponent } from './Componentes/Personas/cliente/cliente.component';
import { VentaComponent } from './Componentes/venta/venta.component';
import { SaldoInventarioComponent } from './Componentes/saldo-inventario/saldo-inventario.component';
import { AuthGuardService } from './Servicios/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'marca', component: MarcaComponent, title: "Marcas", canActivate: [AuthGuardService] },
  { path: 'producto', component: ProductoComponent, title: "Productos", canActivate: [AuthGuardService] },
  {
    path: "personas",
    title: "Personas",
    children: [
      { path: "usuario", component: UsuarioComponent, title: "Usuarios", canActivate: [AuthGuardService] },
      { path: "cliente", component: ClienteComponent, title: "Clientes", canActivate: [AuthGuardService] },
    ]
  },
  { path: 'venta', component: VentaComponent, title: "Ventas", canActivate: [AuthGuardService] },
  { path: 'saldoInventario', component: SaldoInventarioComponent, title: "Saldo Inventario", canActivate: [AuthGuardService] },


  { path: '**', redirectTo: 'login', pathMatch: 'full' }   // Con cualquier ruta desconocida te redirige al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
