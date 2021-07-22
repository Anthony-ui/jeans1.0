import { Ciudad } from './../Clases/ciudad';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

   apiCiudades="https://localhost:44396/api/ciudades/";

  constructor(private http:HttpClient) { }

  listar():Observable<Ciudad[]>
  {
    return this.http.get<Ciudad[]>(this.apiCiudades);
  }

  
  guardarDatos(item: any) {


    return this.http.post(this.apiCiudades,item);

  }


  unRegistro(idCiudad: number): Observable<Ciudad[]> {

    return this.http.get<Ciudad[]>(this.apiCiudades + idCiudad);

  }


  editar(idCiudad: number, Ciudads: Ciudad): Observable<Ciudad[]> {


    return this.http.put<Ciudad[]>(this.apiCiudades + idCiudad, Ciudads);

  }

  eliminar(idCiudad: any) {

    return this.http.delete<Ciudad[]>(this.apiCiudades + idCiudad);
  }

  

busqueda(busqueda:any):Observable<Ciudad[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  return this.http.get<Ciudad[]>(this.apiCiudades + "buscador",{params})
 
}

repetido(Ciudad:any)
{


 
  let params = new HttpParams()
  .set('ciudad',Ciudad)
  return this.http.get(this.apiCiudades + "repetido",{params});
}
  



  
}
