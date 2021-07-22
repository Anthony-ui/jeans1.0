import { detalleFacturaCompra } from './../Clases/detalleFacturaCompra';
import { facturaCompra } from './../Clases/facturaCompra';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaCompraService {

  apiCabezera='https://localhost:44396/api/facturaCompras/';
  apiDetalle='https://localhost:44396/api/detalleFacturaCompras/';
  constructor(private http:HttpClient) { }



  listarCabezera(idFacturaCompra:any):Observable<facturaCompra>
  { 
    const params = new HttpParams()
    .set('id',idFacturaCompra) 

    return this.http.get<facturaCompra>(this.apiCabezera+'listarEncabezado/',{params});
  }

  listarDetalle(idFacturaCompra:any):Observable<detalleFacturaCompra>
  { 
    const params = new HttpParams()
    .set('id',idFacturaCompra) 

    return this.http.get<detalleFacturaCompra>(this.apiDetalle+'listarDetalle/',{params});
  }


   unRegistro(idFactura:any):Observable<facturaCompra>
   {
     return this.http.get<facturaCompra>(this.apiCabezera + idFactura);
   }


   editar(idFacturaCompra:any, objeto:facturaCompra):Observable<facturaCompra>
   {
     return this.http.put<facturaCompra>(this.apiCabezera + idFacturaCompra , objeto);
   }


}
