import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectLoginService {
apiSucursales:string='https://localhost:44396/api/sucursales';
apiEmpleados:string='https://localhost:44396/api/empleados';
constructor(public http:HttpClient) { }

listarSucursales()
{

  return this.http.get(this.apiSucursales);
  
}

listarEmpleados()
{

  return this.http.get(this.apiEmpleados);
  
}


login(objeto:any=""):Observable<any>
{

const accion="/login";
const params =  new HttpParams()
.set('nombre',objeto["sucursales"])
.set('usuario',objeto["usuario"])
.set('contra',objeto["contra"]);


return this.http.get<any>(this.apiEmpleados+accion,{params});
//return this.http.get(this.apiEmpleados+accion,{params});



}

// insertar(usuario:any=""){
//   let usuarioObj= new HttpHeaders({
//    'Content-Type':'applicattion/json; charset=UFT-8'
 
//   });

//   return this.http.post

// }




}
