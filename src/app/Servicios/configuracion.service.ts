import { Observable } from 'rxjs';
import { Configuracion } from './../Clases/configuracion';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  constructor(private http: HttpClient) { }

  private apiconfiguraciones = 'https://localhost:44396/api/configuraciones/';
  private apiValidaciones = 'https://localhost:44396/api/validaciones/';

  listar(): Observable<Configuracion[]> {


    return this.http.get<Configuracion[]>(this.apiconfiguraciones);
  }


  listarActivo(): Observable<Configuracion[]> {


    return this.http.get<Configuracion[]>(this.apiconfiguraciones + "activo");
  }



  guardarDatos(item: any) {

    return this.http.post(this.apiconfiguraciones,item);

  }


  unRegistro(idConfiguracion: number):Observable<Configuracion> {

    return this.http.get<Configuracion>(this.apiconfiguraciones + idConfiguracion);
  }


  editar(idConfiguracion: number, configuraciones: Configuracion):Observable<Configuracion[]> {


    return this.http.put<Configuracion[]>(this.apiconfiguraciones + idConfiguracion, configuraciones);

  }

  eliminar(idConfiguracion: any) {

    return this.http.delete<Configuracion[]>(this.apiconfiguraciones + idConfiguracion);
  }

  

busqueda(busqueda:any):Observable<Configuracion[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  return this.http.get<Configuracion[]>(this.apiconfiguraciones + "buscador",{params})
 
}

repetido(identificador:any)
{
 
  let params = new HttpParams()
  .set('identificador',identificador)
  return this.http.get(this.apiconfiguraciones + "repetido",{params});
}

cedula(cedula:any,sucursal:any)
{
 
  let params = new HttpParams()
  .set('cedula',cedula)
  .set('sucursal',sucursal)
  return this.http.get(this.apiValidaciones + "repetidoConfiguraciones",{params});
}


}
