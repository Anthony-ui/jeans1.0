import { Sucursal } from 'src/app/Clases/sucursal';
import { Cliente } from './../Clases/cliente';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  private apiClientes = 'https://localhost:44396/api/clientes/';
  cedula = "https://localhost:44396/api/validaciones/cedulaCliente";

  listar(sucursal:any): Observable<Cliente[]> {

    const params =  new HttpParams()
    .set('sucursal',sucursal)

    return this.http.get<Cliente[]>( this.apiClientes,{params});
  }

  guardarDatos(item: any) {

    return this.http.post(this.apiClientes,item);

  }


  unRegistro(idcliente: number): Observable<Cliente> {

    return this.http.get<Cliente>(this.apiClientes + idcliente);
  }


  editar(idcliente: number, clientees: Cliente): Observable<Cliente[]> {


    return this.http.put<Cliente[]>(this.apiClientes + idcliente, clientees);

  }

  eliminar(idcliente: any) {

    return this.http.delete<Cliente[]>(this.apiClientes + idcliente);
  }

  

busqueda(busqueda:any,sucursal:any):Observable<Cliente[]>{

  const params =  new HttpParams()
  .set('buscador',busqueda)
  .set('sucursal',sucursal)
  return this.http.get<Cliente[]>(this.apiClientes + "buscador",{params})
 
}

repetido(cedula:any,sucursal:any)
{


  let params = new HttpParams()
  .set('cedula',cedula)
  .set('sucursal', sucursal)
  return this.http.get(this.cedula ,{params});
}

  



compararCliente(cedula:any,sucursal:any):Observable<Cliente[]>
{
   let params = new HttpParams()
  .set('cedula',cedula)
  .set('sucursal',sucursal)
  return this.http.get<Cliente[]>(this.apiClientes + "compararCliente" ,{params});
}




repetidoPasaporte(pasaporte:any, sucursal:any)
{

  let params = new HttpParams()
  .set('pasaporte',pasaporte)
  .set('sucursal',sucursal)

  return this.http.get(this.apiClientes + "repetidoPasaporte" ,{params});
}








  
}
