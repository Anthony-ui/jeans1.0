import { ProveedoresService } from './../../../Servicios/proveedores.service';
import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/Clases/proveedor';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.css']
})
export class ListarProveedoresComponent implements OnInit {
  proveedoresList: Proveedor[] = [];
  idSucursal: number = 0;
  busqueda: string = "";

  constructor(private proveedores: ProveedoresService) { }

  ngOnInit(): void {
    this.ListarProveedores();
  }




  ListarProveedores() {


    var rol = localStorage.getItem('rol');
    var sucursal = localStorage.getItem('sucursal');
    this.proveedores.listar(sucursal).subscribe(res => {

      this.proveedoresList = res;

    }, error => {

      console.log(error);

    });
  }


  buscador(evento: any) {
    var busqueda = evento.target.value;
    this.proveedores.busqueda(busqueda,localStorage.getItem('sucursal')).subscribe(res => {

      if (res.length == 0) {
        this.ListarProveedores();

      } else {

        this.proveedoresList = res;
      }



    }, error => {

    });

  }

  eliminar(idSucursal: any) {


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


        this.proveedores.eliminar(idSucursal).subscribe(res => {
          this.ListarProveedores();

          Swal.fire('proveedores', 'Registro Eliminado exitosamente ', 'success');


        }, error => {
          console.log(error);
        });


   
      }
    })




  }

}
