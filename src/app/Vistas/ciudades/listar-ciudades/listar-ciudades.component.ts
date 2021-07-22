import { CiudadService } from 'src/app/Servicios/ciudad.service';
import { Ciudad } from './../../../Clases/ciudad';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-Ciudades',
  templateUrl: './listar-Ciudades.component.html',
  styleUrls: ['./listar-Ciudades.component.css']
})
export class ListarCiudadesComponent implements OnInit {

  ciudadesList:Ciudad[]=[];
  busqueda:string="";

  idCiudad: number = 0; 

  constructor(private ciudades:CiudadService) { }

  ngOnInit(): void {
    
  
    this.Listarciudades();

  }


  Listarciudades()
  {
    this.ciudades.listar().subscribe(res=>{

      this.ciudadesList=res;
    

    },error=>{

      console.log(error);

    });
  }


  buscador(evento:any)
  {
   var busqueda=evento.target.value;
   this.ciudades.busqueda(busqueda).subscribe(res=>{

    if(res.length==0)
    {
      this.Listarciudades();
      
    }else
    {
     
    this.ciudadesList=res;
    }


   
   },error=>{

   });
     
  }

  eliminar(idCiudad:any)
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


        this.ciudades.eliminar(idCiudad).subscribe(res=>{
          this.Listarciudades();
    
          Swal.fire('ciudades', 'Registro Eliminado exitosamente ', 'success');
           
    
        },error=>{
           console.log(error);
        });

      }
    })




  }


}
