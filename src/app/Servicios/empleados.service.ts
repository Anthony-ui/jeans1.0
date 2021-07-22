import { Sucursal } from 'src/app/Clases/sucursal';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../Clases/empleado';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  apiEmpleados = "https://localhost:44396/api/empleados/";
  apiEmpleadosVeri = "https://localhost:44396/api/validaciones/repetido";
  constructor(private http: HttpClient) { }

  registrar(imagen: any) {

    new Response(imagen).text().then(console.log)
    return this.http.post(this.apiEmpleados, imagen);

  }



  subirImagen(imagen: File, cedula: string) {


    let HTTPOptions: Object = {



      headers: new HttpHeaders({

      }),
      responseType: 'text'
    }


    const formData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    formData.append('cedula', cedula);

    return this.http.post(this.apiEmpleados + 'subir', formData, HTTPOptions).pipe();
  }


  guardarDatos(item: any) {

    return this.http.post(this.apiEmpleados + 'guardar', item);

  }

  listar(sucursal:any): Observable<Empleado[]> {

    const params = new HttpParams()
    .set('sucursal',sucursal)

    return this.http.get<Empleado[]>(this.apiEmpleados,{params});

  }

  unRegistro(idEmpleado: number): Observable<Empleado[]> {

    return this.http.get<Empleado[]>(this.apiEmpleados + "/" + idEmpleado);
  }


  editar(idEmpleado: number, empleados: Empleado): Observable<Empleado[]> {

    return this.http.put<Empleado[]>(this.apiEmpleados + idEmpleado, empleados);

  }

  eliminar(idEmpleado:number):Observable<Empleado[]>{

    return this.http.delete<Empleado[]>(this.apiEmpleados + idEmpleado);
  }


  repetido(cedula:any,sucursal:any){
     const params =  new HttpParams()
    .set('cedula',cedula)
    .set('sucursal',sucursal)

    return this.http.get(this.apiEmpleadosVeri,{params});
  }


  repetidoUsuario(usuario:any){

    const params=new HttpParams()
    .set('usuario',usuario);
    return this.http.get(this.apiEmpleados +"repetidoUsuarios",{responseType: 'text',params});

  }


  
  repetidoPasaporte(pasaporte:any,sucursal:any){

    const params=new HttpParams()
    .set('pasaporte',pasaporte)
    .set('sucursal',sucursal)
    return this.http.get(this.apiEmpleados +"repetidoPasaporte",{params});

  }






busqueda(busqueda:any, sucursal:any):Observable<Empleado[]>{


  const params =  new HttpParams()
  .set('buscador',busqueda)
  .set('sucursal',sucursal)
  return this.http.get<Empleado[]>(this.apiEmpleados + "buscador",{params})


}



comparar(cedula:any,sucursal:any,):Observable<Empleado[]>  
{


  let params = new HttpParams()
  .set('cedula',cedula)
  .set('sucursal',sucursal)

  
  return this.http.get<Empleado[]>(this.apiEmpleados + "comparar/" ,{params});
}







}
