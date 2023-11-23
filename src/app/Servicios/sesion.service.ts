import { Injectable } from '@angular/core';
import { ConfiguracionesProyectoService } from '../Configuraciones/configuraciones-proyecto.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService 
{
  constructor(private config: ConfiguracionesProyectoService) { }

  private obtenerValorSesion(nombre: string) : any
  {
    let valor = localStorage.getItem(this.config.nombreVariableSesion);
    // console.log(this.config.nombreVariableSesion);

    if (valor != null) 
    {
      let objeto = JSON.parse(valor);
      return objeto[nombre];
    } 
    else {
      return null;
    }
  }

  // public obtenerIdUsuarioAutenticado() : number
  // {
  //   let id = this.obtenerValorSesion(this.config.nombreIdUsuarioAutenticado);
  //   return parseInt(id);
  // }

  public obtenerToken() : string
  {
    return this.obtenerValorSesion(this.config.nombreToken); 
  }

  public obtenerExpiracionToken() : any
  {
    return this.obtenerValorSesion(this.config.nombreTiempoExpiracionToken);
  }

}
