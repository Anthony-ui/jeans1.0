import { error } from 'protractor';
import { EmpleadosService } from './../../../Servicios/empleados.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { Empleado } from 'src/app/Clases/empleado';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit {


  empleadosList: Empleado[] = [];

  filtroPost: any = "";

  buscador = "";

  constructor(private empleado: EmpleadosService) { }

  ngOnInit(): void {

    this.listarEmpleados();
  }




  listarEmpleados() {
     var rol= localStorage.getItem('rol');  
     var sucursal= localStorage.getItem('sucursal'); 
      this.empleado.listar(sucursal).subscribe(res => {
      this.empleadosList = res;


    }, error => {


    })

  }
  eliminar(idEmpleado: number) {




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






        this.empleado.eliminar(idEmpleado).subscribe(res => {

          this.listarEmpleados();

        }, error => {
          console.log(error);
        });



        Swal.fire(
          'Empleados!',
          'Registro eliminado exitosamente',
          'success'
        )
      }
    })





  }


  buscar(busqueda: any) {
    var cadena = busqueda.target.value;
    this.empleado.busqueda(cadena,localStorage.getItem('sucursal')).subscribe(res => {

      if (res.length == 0) {

        this.listarEmpleados();

      } else {

        this.empleadosList = res;

      }





    }, error => {

      console.log(error);

    });

  }





}
