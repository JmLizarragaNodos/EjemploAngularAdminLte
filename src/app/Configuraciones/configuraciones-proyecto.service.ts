import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesProyectoService 
{
  rutaWebApi;
  //rutaWebApi = "http://localhost:8999/api"; 

  nombreVariableSesion = "datos_app_prueba";

  nombreToken = "token_app_prueba";
  nombreTiempoExpiracionToken = "expiracion_token_app_prueba";  

  rutaLogin = "/login";
  rutaLoginRealizado = "/producto";
  rutaLogoutRealizado = "/login";

  constructor() 
  { 
    //this.rutaWebApi = window["rutaWebApi"];  // El valor de rutaWebApi esta en el index.html principal

    this.rutaWebApi = (window as any).rutaWebApi;  // El valor de rutaWebApi esta en el index.html principal
  }
  
}
