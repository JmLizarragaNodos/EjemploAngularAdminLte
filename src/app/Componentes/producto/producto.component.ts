import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent 
{

  constructor(private http: HttpClient) 
  {  
		// setTimeout(() => 
    // {
    //   this.obtenerGeneraciones();
    // }, 10000);
  } 

  obtenerGeneraciones()
  {
    return this.http.get<any>(`https://pokeapi.co/api/v2/generation`).subscribe((data: any) => {
      console.log(data);
    });
  }
}
