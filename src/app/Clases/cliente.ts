import { Sucursal } from './sucursal';
export interface Cliente {
    idCliente:number,
    esPasaporte:boolean,
    cedula:string,
    nombre:string,
    apellido:string,
    direccion:string,
    celular:string,
    correo:string,
    idSucursal:number,
    fechaRegistro:string,
    sucursal:Sucursal
}