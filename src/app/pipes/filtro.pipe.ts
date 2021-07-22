import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(objeto: any, input: any): any {

    const resultado = [];



    // for (let valor of objeto) {

      // if (valor.cedula.indexOf(input)  > -1) {
      //   resultado.push(valor);
      //   }

    //   return objeto.filter((item:any) => {
    //     const notMatchingField = Object.keys(input)
    //                                  .find(key => item[key] !== input[key]);

                                     
    //     return !notMatchingField; // true if matches all fields
    // });



    // return  objeto.filter((item:any) => {
    //       return  item.nombre.toLowerCase().includes(input.toLowerCase()) || item.apellido.toLowerCase().includes(input.toLowerCase()) ;
      // });

    // }
    //return resultado;

  }



}
