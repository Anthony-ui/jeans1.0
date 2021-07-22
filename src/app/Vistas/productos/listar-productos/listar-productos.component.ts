import { Producto } from './../../../Clases/producto';
import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { log } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  productosList:Producto[]=[];
  busqueda="";

  constructor(
    private producto:ProductosService
  ) {



   }

  ngOnInit(): void {

    this.listar();
  }


  buscador(event:any)
  {
    this.busqueda=event.target.value;
    
    this.producto.busqueda(this.busqueda,localStorage.getItem('sucursal')).subscribe(res=>{
 
      if (res.length == 0) {

        this.listar();

      } else {

        this.productosList = res;

      }



    },error=> console.log(error))


  }

  eliminar(idProducto:any)
{



  
  Swal.fire({
    title: '¿Seguro que desea eliminar?',
    text: " este registro se eliminará permanentemente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {


      this.producto.eliminar(idProducto).subscribe(res=>{
     

        this.listar();
      
  
      },error=> console.log(error))



      Swal.fire(
        'Empleados!',
        'Registro eliminado exitosamente',
        'success'
      )


    }
  })


}

listar()
{
 this.producto.listar(localStorage.getItem('sucursal')).subscribe(res=>{

  this.productosList=res;



 },error=> console.log(error))
}
}
