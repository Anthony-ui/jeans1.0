import { error } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/Clases/sucursal';
import { SucursalesService } from 'src/app/Servicios/sucursales.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-sucursal',
  templateUrl: './listar-sucursal.component.html',
  styleUrls: ['./listar-sucursal.component.css']
})
export class ListarSucursalComponent implements OnInit {

sucursalesList:Sucursal[]=[];
idSucursal: number = 0;
busqueda:string="";

  constructor(private sucursales:SucursalesService) { }

  ngOnInit(): void {
    this.ListarSucursales();
  }


  ListarSucursales()
  {
    this.sucursales.listar().subscribe(res=>{

      this.sucursalesList=res;

    },error=>{

      console.log(error);

    });
  }


  buscador(evento:any)
  {
   var busqueda=evento.target.value;
   this.sucursales.busqueda(busqueda).subscribe(res=>{

    if(res.length==0)
    {
      this.ListarSucursales();
      
    }else
    {
     
    this.sucursalesList=res;
    }


   
   },error=>{

   });
     
  }

  eliminar(idSucursal:any)
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


        this.sucursales.eliminar(idSucursal).subscribe(res=>{
          this.ListarSucursales();
    
          Swal.fire('Sucursales', 'Registro Eliminado exitosamente ', 'success');
           
    
        },error=>{
           console.log(error);
        });


        Swal.fire(
          'Deleted!',
          'Registro eliminado exitosamente',
          'success'
        )
      }
    })




  }

  

}


