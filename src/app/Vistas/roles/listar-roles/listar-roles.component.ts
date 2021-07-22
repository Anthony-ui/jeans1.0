import { RolesService } from './../../../Servicios/roles.service';
import { Rol } from './../../../Clases/rol';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent implements OnInit {


  rolesList:Rol[]=[];
  busqueda:string="";

  idSucursal: number = 0; 

  constructor(private roles:RolesService) { }

  ngOnInit(): void {
  
    this.Listarroles();

  }


  Listarroles()
  {
    this.roles.listar().subscribe(res=>{

      this.rolesList=res;
    

    },error=>{

      console.log(error);

    });
  }


  buscador(evento:any)
  {
   var busqueda=evento.target.value;
   this.roles.busqueda(busqueda).subscribe(res=>{

    if(res.length==0)
    {
      this.Listarroles();
      
    }else
    {
     
    this.rolesList=res;
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


        this.roles.eliminar(idSucursal).subscribe(res=>{
          this.Listarroles();
    
          Swal.fire('roles', 'Registro Eliminado exitosamente ', 'success');
           
    
        },error=>{
           console.log(error);
        });

      }
    })




  }
}
