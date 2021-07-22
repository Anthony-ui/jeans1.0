import { Sucursal } from './../Clases/sucursal';
import { Producto } from './../Clases/producto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../Clases/proveedor';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiProveedor="https://localhost:44396/api/proveedores/listaProveedor";
  apiProductos="https://localhost:44396/api/productos/";

  constructor(private http:HttpClient) { }



  subirImagen(imagen: File, nombre: string) {


    let HTTPOptions: Object = {



      headers: new HttpHeaders({

      }),
      responseType: 'text'
    }


    const formData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    formData.append('nombre', nombre);
    return this.http.post(this.apiProductos + 'subir', formData, HTTPOptions).pipe();
  }



  listarProveedor():Observable<Proveedor[]>
  {
      return this.http.get<Proveedor[]>(this.apiProveedor);
  }




  guardarDatos(item: any) {

    return this.http.post(this.apiProductos , item);

  }

  listar(sucursal:any): Observable<Producto[]> {

    const params = new HttpParams()
    .set('sucursal',sucursal)

    return this.http.get<Producto[]>(this.apiProductos,{params});

  }

  unRegistro(idProducto: number): Observable<Producto> {

    return this.http.get<Producto>(this.apiProductos + "/" + idProducto);
  }


  editar(idProducto: any, Productos: Producto): Observable<Producto[]> {

    return this.http.put<Producto[]>(this.apiProductos + idProducto, Productos);

  }

  eliminar(idProducto:number):Observable<Producto[]>{

    return this.http.delete<Producto[]>(this.apiProductos + idProducto);
  }


  repetido(nombre:any,talla:any, sucursal:any,categoria:any)  
{


  let params = new HttpParams()
  .set('nombre',nombre)
  .set('talla',talla)
  .set('sucursal',sucursal)
  .set('categoria',categoria)
  return this.http.get(this.apiProductos + "repetido/" ,{responseType:'text', params});
}

comparar(producto:any,sucursal:any,categoria:any, talla:any)  
{


  let params = new HttpParams()
  .set('producto',producto)
  .set('sucursal',sucursal)
  .set('categoria',categoria)
  .set('talla',talla)
  
  return this.http.get(this.apiProductos + "comparar/" ,{params});
}




busqueda(busqueda:string,sucursal:any):Observable<Producto[]>{

  const params =  new HttpParams()

  
  .set('buscador',busqueda)
  .set('sucursal',sucursal)


  return this.http.get<Producto[]>(this.apiProductos + "buscador",{params})
 
}


// proveedorObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');

}
