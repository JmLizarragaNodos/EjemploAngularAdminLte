//import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ConfiguracionesProyectoService } from './Configuraciones/configuraciones-proyecto.service';
//import { FuncionesGlobalesService } from './Servicios/funciones-globales.service';
import { SesionService } from './Servicios/sesion.service';
import {filter} from 'rxjs/operators';

export class ItemMenu
{
  public path? : string;
  public title? : any;
  public icono? : string;
  public children? : Array<any>;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  public rutaActual = "";
  public directorioAgrupador = "";
  private url = ""; 
  public autorizadoEntrar = false
  public arreglo: Array<ItemMenu>;

  constructor(
    private config        : ConfiguracionesProyectoService, 
    //private funciones     : FuncionesGlobalesService, 
    private http          : HttpClient, 
    private router        : Router, 
    private servicioSesion: SesionService
  ) 
  {
    this.url = config.rutaWebApi;

    this.arreglo = this.router.config.filter(x => x.title != null).map(x => 
    {
      return {
        path: x.path,
        title: x.title,
        icono: this.obtenerIcono(x),
        children: x.children?.map(y => 
        {
          return {
            path: y.path,
            title: y.title,
            icono: this.obtenerIcono(y),
          };
        })
      };
    });
  }

  obtenerIcono(ruta: Route) : string
  {
    let path = ruta.path;

    if (path == "marca") return "fas fa-book";
    else if (path == "producto") return "far fa-image";
    else if (path == "usuario") return "fas fa-circle";
    else if (path == "cliente") return "fas fa-circle";
    else if (path == "venta") return "far fa-circle text-info";
    else if (path == "saldoInventario") return "fas fa-edit";
    else 
      return "fas fa-circle";
  }

  ngOnInit() 
  { 
    //console.log("token", this.servicioSesion.obtenerToken());

    if (this.servicioSesion.obtenerToken() != null) {
      this.autorizadoEntrar = true; 
    }   
	} 

  ngAfterViewInit()
  {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: any) => 
    {
      let url = event.url;      // "/contabilidad/planCuentaAcordeon"
      url = url.substring(1);   // "contabilidad/planCuentaAcordeon"       // Remueve primer caracter 

      if (url.includes("/"))   // Si es una ruta compuesta
      {
        this.directorioAgrupador = url.split("/")[0];   // contabilidad
        this.rutaActual = url.split("/")[1];            // planCuentaAcordeon

        setTimeout(() => // Hacer que la fecha hacia abajo de otros items que estaban abiertos pase a estar hacia el lado
        {
          Array.from(document.querySelectorAll(".nav-item.menu-is-opening")).filter(x => !x.classList.contains("menu-open")).forEach(x => {
              x.classList.remove("menu-is-opening");
          });
        }, 100);
        
      }
      else 
      {
        this.rutaActual = url; 
        this.directorioAgrupador = "";
      }  

      // console.log("directorioAgrupador", this.directorioAgrupador);
      // console.log("rutaActual", this.rutaActual);
      // console.log("autorizadoEntrar: " + this.autorizadoEntrar);
    });
  }

  // redirigirComponente(routerLink: string) 
  // {
  //   this.router.navigate([`/${routerLink}`]);
  // }

  loguearse(jsonDatosForm:any) 
  {
    if (jsonDatosForm.username == "" || jsonDatosForm.password == "")
    {
      alert("Usuario o clave incompletos");
    }
    else
    {
      //===============================================================>>>>>
      // ENTRAR SIN LLAMAR AL BACKEND:

      this.autorizadoEntrar = true; 

      //var exp = Date.now() + 5000; // 5000 milisegundos (5 segundos)
      var exp = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 horas en milisegundos

      let datosSesion: any = {};
      datosSesion[this.config.nombreToken] = "dfsdfsfsfhhhhhhhhhhhh";
      datosSesion[this.config.nombreTiempoExpiracionToken] = exp;

      localStorage.setItem(this.config.nombreVariableSesion, JSON.stringify(datosSesion));
      this.router.navigate([this.config.rutaLoginRealizado]);

      //===============================================================>>>>>

      /*
      this.http.post(this.url + "/login", JSON.stringify(jsonDatosForm), {headers: {"Content-Type": "application/json"}})
      .subscribe(
        (datos:any) => 
        {
          //console.log("datos", datos);
          this.autorizadoEntrar = true; 

          let datosSesion: any = {};

          datosSesion[this.config.nombreToken] = datos.token;
          datosSesion[this.config.nombreTiempoExpiracionToken] = datos.expiration;
          localStorage.setItem(this.config.nombreVariableSesion, JSON.stringify(datosSesion));

          this.router.navigate([this.config.rutaLoginRealizado]);
        },
        (excepcion) => {
          this.autorizadoEntrar = false; 
          alert(excepcion.error.message);
        }
      );
      */
    }
    
  }

  salirSistema(evento:any)    
  {
    if (evento != null)
      evento.preventDefault();

    localStorage.removeItem(this.config.nombreVariableSesion);
    this.autorizadoEntrar = false; 
    this.router.navigate([this.config.rutaLogoutRealizado]);
  }

}
