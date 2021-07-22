import { Categoria } from './../Clases/categoria';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  private apiCategorias = 'https://localhost:44396/api/categorias/';

  listar(): Observable<Categoria[]> {


    return this.http.get<Categoria[]>(this.apiCategorias);
  }

  guardarDatos(item: any) {

    return this.http.post(this.apiCategorias,item);

  }


  unRegistro(idCategoria: number): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.apiCategorias + idCategoria);
  }


  editar(idCategoria: number, Categorias: Categoria): Observable<Categoria[]> {


    return this.http.put<Categoria[]>(this.apiCategorias + idCategoria, Categorias);

  }

  eliminar(idCategoria: any) {

    return this.http.delete<Categoria[]>(this.apiCategorias + idCategoria);
  }

  

busqueda(busqueda:any):Observable<Categoria[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  return this.http.get<Categoria[]>(this.apiCategorias + "buscador",{params})
 
}

repetido(Categoria:any)
{


 
  let params = new HttpParams()
  .set('categoria',Categoria)
  return this.http.get(this.apiCategorias + "repetido",{params});
}






}
