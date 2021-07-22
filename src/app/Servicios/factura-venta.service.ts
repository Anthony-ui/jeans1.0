import { facturaVenta } from './../Clases/facturaVenta';
import { Cliente } from './../Clases/cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FacturaVentaService {

  private apiFacturas = 'https://localhost:44396/api/facturaventas/';
  private apiDetalle= 'https://localhost:44396/api/detalleFacturaVentas/';

  constructor(private http: HttpClient) { }


  numeroFactura() {
    return this.http.get(this.apiFacturas+"num");
  }

  guardarEncabezado(objeto: any): Observable<any> {
    // var header = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.post<any>(this.apiFacturas, objeto);

  }



  guardarDetalle(objeto: any): Observable<any> {


    return this.http.post<any>(this.apiDetalle, objeto);

  }


  ultimaFactura(idCliente: any,idSucursal:any){

   
    const params =  new HttpParams()
    .set('idCliente',idCliente)
    .set('idSucursal',idSucursal)

    return this.http.get(this.apiFacturas + "ultimaFactura", {params});

  }

 


 









}
