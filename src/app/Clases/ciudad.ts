import { Provincia } from './provincia';
export interface Ciudad {

    idCiudad:number;
    nombre:string;
    idProvincia:Provincia
    provincia:Provincia

    }