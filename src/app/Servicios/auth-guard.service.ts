import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ConfiguracionesProyectoService } from '../Configuraciones/configuraciones-proyecto.service';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{

  constructor(private config: ConfiguracionesProyectoService, private router: Router, private servicioSesion:SesionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    var token = this.servicioSesion.obtenerToken();
    //var token = localStorage.getItem(this.config.nombreToken);

    if (token != null)  
    {
      return true;  // Si el usuario tiene permiso, puede entrar al componente que desea entrar
    } 
    else 
    {
      alert("Usted no tiene permiso para entrar aquí");
      //this.router.navigate(["/login"]);  
      this.router.navigate([this.config.rutaLogin]);  // Lo redirige al sector del login
      return false;
    }
  }
}
