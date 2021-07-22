import { Rol } from './rol';
import { Sucursal } from './sucursal';


export interface Empleado {
    idUsuario:number,
    esPasaporte:boolean,
    cedula:string,
    nombre:string,
    apellido:string,
    direccion:string,
    celular:string,
    correo:string,
    usuario:string,
    edad:number,
    contra:string,
    fechaRegistro:string,
    idSucursal:number,
    idRol:number,
    imagen:string,
    rol:Rol,
    sucursal:Sucursal
}