import { Ciudad } from './ciudad';
import { Sucursal } from './sucursal';
export interface Proveedor {
    idProveedor:number,
    esPasaporte:boolean,
    cedula:string,
    nombre:string,
    direccion:string,   
    telefono:string,
    celular:string,
    correo:string,
    idCiudad:number,
    idSucursal:string,
    ciudad:Ciudad,
    sucursal:Sucursal
}