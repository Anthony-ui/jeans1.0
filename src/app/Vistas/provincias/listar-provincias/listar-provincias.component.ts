import { ProvinciaService } from './../../../Servicios/provincia.service';
import { Provincia } from './../../../Clases/provincia';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-provincias',
  templateUrl: './listar-provincias.component.html',
  styleUrls: ['./listar-provincias.component.css']
})
export class ListarProvinciasComponent implements OnInit {
  provinciasList:Provincia[]=[];
  busqueda:string="";

  idProvincia: number = 0; 

  constructor(private provincias:ProvinciaService) { }

  ngOnInit(): void {
    
  
    this.Listarprovincias();

  }


  Listarprovincias()
  {
    this.provincias.listar().subscribe(res=>{

      this.provinciasList=res;
    

    },error=>{

      console.log(error);

    });
  }


  buscador(evento:any)
  {
   var busqueda=evento.target.value;
   this.provincias.busqueda(busqueda).subscribe(res=>{

    if(res.length==0)
    {
      this.Listarprovincias();
      
    }else
    {
     
    this.provinciasList=res;
    }


   
   },error=>{

   });
     
  }

  eliminar(idProvincia:any)
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


        this.provincias.eliminar(idProvincia).subscribe(res=>{
          this.Listarprovincias();
    
          Swal.fire('provincias', 'Registro Eliminado exitosamente ', 'success');
           
    
        },error=>{
           console.log(error);
        });

      }
    })




  }

}
