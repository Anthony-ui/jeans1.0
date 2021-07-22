import { Sucursal } from './../Clases/sucursal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SucursalesService {


  constructor(private http: HttpClient) { }

  private apiSucursales = 'https://localhost:44396/api/sucursales/';

  listar(): Observable<Sucursal[]> {


    return this.http.get<Sucursal[]>(this.apiSucursales);
  }

  guardarDatos(item: any) {

    return this.http.post(this.apiSucursales,item);

  }


  unRegistro(idSucursal: number): Observable<Sucursal[]> {

    return this.http.get<Sucursal[]>(this.apiSucursales + idSucursal);
  }


  editar(idSucursal: number, Sucursales: Sucursal): Observable<Sucursal[]> {


    return this.http.put<Sucursal[]>(this.apiSucursales + idSucursal, Sucursales);

  }

  eliminar(idSucursal: any) {

    return this.http.delete<Sucursal[]>(this.apiSucursales + idSucursal);
  }

  

busqueda(busqueda:any):Observable<Sucursal[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  return this.http.get<Sucursal[]>(this.apiSucursales + "buscador",{params})
 
}

repetido(sucursal:any)
{


 
  let params = new HttpParams()
  .set('sucursal',sucursal)
  return this.http.get(this.apiSucursales + "repetido",{params});
}






}
