import { ToastrService } from 'ngx-toastr';
import { ConfiguracionService } from './../../../Servicios/configuracion.service';
import { Component, OnInit } from '@angular/core';
import { Configuracion } from 'src/app/Clases/configuracion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-configuraciones',
  templateUrl: './listar-configuraciones.component.html',
  styleUrls: ['./listar-configuraciones.component.css']
})
export class ListarConfiguracionesComponent implements OnInit {

  configuracionesList:Configuracion[]=[];
  idSucursal: number = 0;
  busqueda:string="";
  
    constructor(private configuraciones:ConfiguracionService,
      private toastr: ToastrService,


      ) { }
  
    ngOnInit(): void {
      this.Listarconfiguraciones();
    }
  
  
    Listarconfiguraciones()
    {
      this.configuraciones.listar().subscribe(res=>{

     
  
        this.configuracionesList=res;
       
  
      },error=>{
  
        console.log(error);
  
      });
    }
  
  
    buscador(evento:any)
    {
     var busqueda=evento.target.value;
     this.configuraciones.busqueda(busqueda).subscribe(res=>{
  
      if(res.length==0)
      {
        this.Listarconfiguraciones();
        
      }else
      {
       
      this.configuracionesList=res;
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
  
  
          this.configuraciones.eliminar(idSucursal).subscribe(res=>{
            this.Listarconfiguraciones();
      
            Swal.fire('configuraciones', 'Registro Eliminado exitosamente ', 'success');
             
      
          },error=>{
             this.toastr.error("error al eliminar");
          });
  
  
        }
      })
  
  
  
  
    }
}
