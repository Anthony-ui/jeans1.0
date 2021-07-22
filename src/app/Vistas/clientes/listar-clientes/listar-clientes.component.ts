import  Swal  from 'sweetalert2';
import { ClientesService } from './../../../Servicios/clientes.service';
import { Cliente } from './../../../Clases/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clienteList:Cliente[]=[];
  busqueda="";
  constructor(private clientes:ClientesService) { }

  ngOnInit(): void {


    this.listar();
  }


  listar()
  {

    var obj=JSON.parse( localStorage.getItem('usuario')!);

     let sucursal=localStorage.getItem('sucursal');
  
     let rol=localStorage.getItem('rol');



    



    this.clientes.listar(sucursal).subscribe(res=>{


      this.clienteList=res;

    },error=> console.log(error));


  }

  eliminar(id:any)
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


    this.clientes.eliminar(id).subscribe(res=>{
    this.listar();

    },error=>console.log(error))




        Swal.fire(

          ' Eliminado!',
          'Registro eliminado exitosamente',
          'success'

        )

      }
    })




  }

  buscador(event:any)
  {
    var evento=event.target.value;

    this.clientes.busqueda(evento,localStorage.getItem('sucursal')).subscribe(res=>{


      if(res.length ==0)
      {
       this.listar();
      }else
      {
        this.clienteList=res;

      }


    },error=>{
      console.log(error);
    })


  }

}
