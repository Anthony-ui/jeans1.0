import { facturaVenta } from './../Clases/facturaVenta';
import { detalleFacturaVenta } from './../Clases/detalleFacturaVenta';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaVentaService {
 
  apiCabezera='https://localhost:44396/api/facturaVentas/';
  apiDetalle='https://localhost:44396/api/detalleFacturaVentas/';
  constructor(private http:HttpClient) { }



  listarCabezera(idfacturaVenta:any):Observable<facturaVenta>
  { 
    const params = new HttpParams()
    .set('id',idfacturaVenta) 

    return this.http.get<facturaVenta>(this.apiCabezera+'listarEncabezado/',{params});
  }

  listarDetalle(idfacturaVenta:any):Observable<detalleFacturaVenta>
  { 
    const params = new HttpParams()
    .set('id',idfacturaVenta) 

    return this.http.get<detalleFacturaVenta>(this.apiDetalle+'listarDetalle/',{params});
  }


   unRegistro(idFactura:any):Observable<facturaVenta>
   {
  
     return this.http.get<facturaVenta>(this.apiCabezera + idFactura);
   }


   editar(idfacturaVenta:any, objeto:facturaVenta):Observable<facturaVenta>
   {
     return this.http.put<facturaVenta>(this.apiCabezera + idfacturaVenta , objeto);
   }




}
