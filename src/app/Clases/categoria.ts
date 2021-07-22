import { Sucursal } from './sucursal';

export interface Categoria {

    idCategoria:number;
    nombre:string;
    descripcion:String;
    idSucursal:number;
    sucursal:Sucursal;

}