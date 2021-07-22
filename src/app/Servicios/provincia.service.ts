import { Provincia } from './../Clases/provincia';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  apiProvincias="https://localhost:44396/api/Provincias/";


  constructor(private http:HttpClient) { }

  listar():Observable<Provincia[]>
  {
    return this.http.get<Provincia[]>(this.apiProvincias);
  }


  guardarDatos(item: any) {

    return this.http.post(this.apiProvincias,item);

  }


  unRegistro(idProvincia: number): Observable<Provincia[]> {

    return this.http.get<Provincia[]>(this.apiProvincias + idProvincia);

  }


  editar(idProvincia: number, Provincias: Provincia): Observable<Provincia[]> {


    return this.http.put<Provincia[]>(this.apiProvincias + idProvincia, Provincias);

  }

  eliminar(idProvincia: any) {

    return this.http.delete<Provincia[]>(this.apiProvincias + idProvincia);
  }

  

busqueda(busqueda:any):Observable<Provincia[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  return this.http.get<Provincia[]>(this.apiProvincias + "buscador",{params})
 
}

repetido(Provincia:any)
{


 
  let params = new HttpParams()
  .set('provincia',Provincia)
  return this.http.get(this.apiProvincias + "repetido",{params});
}
  
}
