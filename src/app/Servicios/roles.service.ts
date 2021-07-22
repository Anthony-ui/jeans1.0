import { Rol } from './../Clases/rol';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

 apiRoles="https://localhost:44396/api/roles/";


  constructor(private http:HttpClient) { }

  listar():Observable<Rol[]>
  {
    return this.http.get<Rol[]>(this.apiRoles);
  }


  guardarDatos(item: any) {

    return this.http.post(this.apiRoles,item);

  }


  unRegistro(idRol: number): Observable<Rol[]> {

    return this.http.get<Rol[]>(this.apiRoles + idRol);

  }


  editar(idRol: number, Rols: Rol): Observable<Rol[]> {


    return this.http.put<Rol[]>(this.apiRoles + idRol, Rols);

  }

  eliminar(idRol: any) {

    return this.http.delete<Rol[]>(this.apiRoles + idRol);
  }

  

busqueda(busqueda:any):Observable<Rol[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  return this.http.get<Rol[]>(this.apiRoles + "buscador",{params})
 
}

repetido(Rol:any)
{


 
  let params = new HttpParams()
  .set('rol',Rol)
  return this.http.get(this.apiRoles + "repetido",{params});
}
  

    


  

}
