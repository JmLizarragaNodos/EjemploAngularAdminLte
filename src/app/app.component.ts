//import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ConfiguracionesProyectoService } from './Configuraciones/configuraciones-proyecto.service';
//import { FuncionesGlobalesService } from './Servicios/funciones-globales.service';
import { SesionService } from './Servicios/sesion.service';
import {filter} from 'rxjs/operators';

export class ItemMenu
{
  public path : string;
  public descripcion : string;
  public icono? : string;
  public children? : Array<ItemMenu>;

  constructor() {
    this.path = "";
    this.descripcion = "";
  }
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

    this.arreglo = [
      { path: "marca", descripcion: "Marcas", icono: "fas fa-book" },
      { path: "producto", descripcion: "Productos", icono: "far fa-image" },
      { 
        path: "personas", 
        descripcion: "Personas",
        children: [
          { path: "usuario", descripcion: "Usuarios", icono: "fas fa-circle" },
          { path: "cliente", descripcion: "Clientes", icono: "fas fa-circle" },
        ]
      },
      // { 
      //   path: "contabilidad", 
      //   descripcion: "Contabilidad",
      //   children: [
      //     { path: "planCuenta", descripcion: "Planes de Cuenta", icono: "fas fa-edit" },               
      //     { path: "planCuentaDummy", descripcion: "Planes de Cuenta Dummy", icono: "far fa-circle" },
      //     { path: "planCuentaAcordeon", descripcion: "Planes de Cuenta Acordeón", icono: "fas fa-edit" },
      //     { path: "balanceGeneralDummy", descripcion: "Balance General Dummy", icono: "far fa-circle" },
      //     { path: "estadoDeResultadoDummy", descripcion: "Estado de Resultado Dummy", icono: "far fa-circle" },
      //     { path: "asientoContableDummy", descripcion: "Asiento Contable Dummy", icono: "far fa-circle" },
      //   ]
      // },
      { path: "venta", descripcion: "Ventas", icono: "far fa-circle text-info" },
      { path: "saldoInventario", descripcion: "Saldo Inventario", icono: "fas fa-edit" }
    ];
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
