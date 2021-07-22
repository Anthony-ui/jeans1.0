import { Sucursal } from './sucursal';
import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";
export interface Producto
{

    idProducto:number,
    idCategoria:number,
    nombre:string,
    talla:string,
    descripcion:string,
    precioCompra:number,
    precioUnidad:number,
    precioDocena:number,
    margenGanancia:number,
    maxDescuento:number,
    imagen:string,
    stock:number,
    idSucursal:number,
    idProveedor:number,
    categoria:Categoria,
    sucursal:Sucursal,
    proveedor:Proveedor
 

}