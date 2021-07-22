import { Sucursal } from 'src/app/Clases/sucursal';
import { Proveedor } from './../Clases/proveedor';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  private apiProveedores = 'https://localhost:44396/api/Proveedores/';
  cedula = "https://localhost:44396/api/validaciones/cedulaProveedor";

  listar(sucursal:any): Observable<Proveedor[]> {
    const params =  new HttpParams()
    .set('sucursal',sucursal)

    return this.http.get<Proveedor[]>( this.apiProveedores,{params});
  }

  guardarDatos(item: any) {

    return this.http.post(this.apiProveedores,item);

  }


  unRegistro(idProveedor: number): Observable<Proveedor[]> {

    return this.http.get<Proveedor[]>(this.apiProveedores + idProveedor);
  }


  editar(idProveedor: number, Proveedores: Proveedor): Observable<Proveedor[]> {


    return this.http.put<Proveedor[]>(this.apiProveedores + idProveedor, Proveedores);

  }

  eliminar(idProveedor: any) {

    return this.http.delete<Proveedor[]>(this.apiProveedores + idProveedor);
  }

  

busqueda(busqueda:any,sucursal:any):Observable<Proveedor[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  .set('sucursal',sucursal)
  return this.http.get<Proveedor[]>(this.apiProveedores + "buscador",{params})
 
}

repetido(cedula:any,sucursal:any)
{


  let params = new HttpParams()
  .set('cedula',cedula)
  .set('sucursal',sucursal)
  return this.http.get(this.cedula ,{params});
}

repetidoPasaporte(pasaporte:any, sucursal:any)
{


  let params = new HttpParams()
  .set('pasaporte',pasaporte)
  .set('sucursal',sucursal)
  return this.http.get(this.apiProveedores + "repetido" ,{params});
}

compararProveedor(cedula:any,sucursal:any):Observable<Proveedor[]>
{


  let params = new HttpParams()
  .set('cedula',cedula)
  .set('sucursal',sucursal)
  return this.http.get<Proveedor[]>(this.apiProveedores + "compararProveedor" ,{params});
}


}
