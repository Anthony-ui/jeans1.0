import { Ciudad } from './ciudad';
export interface Sucursal{
idSucursal:number;
nombre:string;
direccion:string;
telefono:string;
celular:string;
idCiudad:number;
ciudad:Ciudad;
}