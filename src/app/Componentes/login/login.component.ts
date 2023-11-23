import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionesProyectoService } from 'src/app/Configuraciones/configuraciones-proyecto.service';
import { AppComponent } from 'src/app/app.component';

export class UsuarioFicticio 
{
  public username : string;
  public password : string;

  constructor() {
    this.username = "hola@gmail.com";
    this.password = "abcd@Prueba_123456";
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{
  public usuario: UsuarioFicticio;

  constructor(public componentePrincipal: AppComponent, private config: ConfiguracionesProyectoService, private router: Router) 
  { 
    this.usuario = new UsuarioFicticio();
  }

  ngOnInit() {
    
    //console.log("this.componentePrincipal.autorizadoEntrar", this.componentePrincipal.autorizadoEntrar);

    if (this.componentePrincipal.autorizadoEntrar) 
    {
      // Impide que al entrar por la url    http://localhost:4200    estando autenticado, aparezca el formulario de login y el nav de navegación
      this.router.navigate([this.config.rutaLoginRealizado]);
    }
  }

  loguearse(evento:any, datosForm: NgForm) 
  {
    evento.preventDefault();
    let jsonDatosForm = datosForm.form.value;
    this.componentePrincipal.loguearse(jsonDatosForm);
  }

}
