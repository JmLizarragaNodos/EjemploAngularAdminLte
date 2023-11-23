import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { ConfiguracionesProyectoService } from '../Configuraciones/configuraciones-proyecto.service';
import { SesionService } from './sesion.service';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor
{

  constructor(private config: ConfiguracionesProyectoService, private router: Router, private servicioSesion:SesionService, public componentePrincipal: AppComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    var token = this.servicioSesion.obtenerToken();

    if (token != null)    // Si el usuario ya inicio sesion, valida que el token no este expirado
    {
      var exp: any = this.servicioSesion.obtenerExpiracionToken();
  
      if (new Date().getTime() >= parseInt(exp))   // Si ya expiró el token
      {
        alert("Se termino el tiempo limite de uso del usuario");
        localStorage.removeItem(this.config.nombreToken);
        localStorage.removeItem(this.config.nombreTiempoExpiracionToken);
        this.componentePrincipal.salirSistema(null);
        //this.router.navigate([this.config.rutaLogin]);   // this.router.navigate(["/Login"]); 
        //window.location.reload();
      } 
    } 

    if (token != null)   // Si es cualquier otra ruta diferente del login
    {
      //console.log("Bearer token enviado es " + token);

      req = req.clone({
        setHeaders: { Authorization: "Bearer " + token }
      });
    }

    return next.handle(req).pipe( tap(() => {}, (err: any) => 
    {
      console.log("Se encontro un error");
      /*
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        console.log("Se encontro un 401");
      }
      */

    }));
    
    //return next.handle(req);  // Se envia el nuevo request que ha sido clonado y se le agrego un header

  }
}

