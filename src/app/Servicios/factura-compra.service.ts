import { facturaCompra } from './../Clases/facturaCompra';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaCompraService {
  private apiFacturas = 'https://localhost:44396/api/facturaCompras/';
  private apiDetalle= 'https://localhost:44396/api/detalleFacturaCompras/';

  constructor(private http: HttpClient) { }


  numeroFactura() {
    return this.http.get(this.apiFacturas+"num");
  }

  guardarEncabezado(objeto: facturaCompra): Observable<any> {
    // var header = new HttpHeaders({ 'content-type': 'application/json' });


    return this.http.post<facturaCompra>(this.apiFacturas, objeto);

  }



  guardarDetalle(objeto: any): Observable<any> {


    return this.http.post<any>(this.apiDetalle, objeto);

  }


  ultimaFactura(idProveedor: any,idSucursal:any){


    const params =  new HttpParams()
    .set('idProveedor',idProveedor)
    .set('idSucursal',idSucursal)

    return this.http.get(this.apiFacturas + "ultimaFactura", {params});

  }

}
