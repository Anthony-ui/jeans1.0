 import { CategoriasService } from './../../../Servicios/categorias.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Clases/categoria';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {
  
  
  categoriasList:Categoria[]=[];
  busqueda:string="";

  idSucursal: number = 0; 

  constructor(private categorias:CategoriasService) { }

  ngOnInit(): void {
  
    this.Listarcategorias();

  }


  Listarcategorias()
  {
    this.categorias.listar().subscribe(res=>{

      this.categoriasList=res;
    

    },error=>{

      console.log(error);

    });
  }


  buscador(evento:any)
  {
   var busqueda=evento.target.value;
   this.categorias.busqueda(busqueda).subscribe(res=>{

    if(res.length==0)
    {
      this.Listarcategorias();
      
    }else
    {
     
    this.categoriasList=res;
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


        this.categorias.eliminar(idSucursal).subscribe(res=>{
          this.Listarcategorias();
    
          Swal.fire('categorias', 'Registro Eliminado exitosamente ', 'success');
           
    
        },error=>{
           console.log(error);
        });

      }
    })




  }





}
