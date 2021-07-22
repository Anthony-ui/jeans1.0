import { trimValidator } from './../../../validadores';
import { error } from 'protractor';
import { SucursalesService } from './../../../Servicios/sucursales.service';
import { Ciudad } from './../../../Clases/ciudad';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from 'src/app/Servicios/ciudad.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/Clases/sucursal';


@Component({
  selector: 'app-insertar-sucursal',
  templateUrl: './insertar-sucursal.component.html',
  styleUrls: ['./insertar-sucursal.component.css']
})
export class InsertarSucursalComponent implements OnInit {

  IdSucursal: number = 0;
  ciudadList: Ciudad[] = [];
  sucursalRepetido="";


  sucursalesForm = new FormGroup({


    nombre: new FormControl('', trimValidator),
    direccion: new FormControl('', trimValidator),
    telefono: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    idCiudad: new FormControl('', Validators.required),


  });




  constructor(
    private router: Router,
    private ciudades: CiudadService,
    private sucursales: SucursalesService,
    private toastr: ToastrService,
    private el: ElementRef,
    private rutaActiva: ActivatedRoute

  ) {
    this.IdSucursal = this.rutaActiva.snapshot.params.id;




    if (this.IdSucursal == undefined) {
      this.listarCiudad();




    } else {

      this.unSucursal(this.IdSucursal);



    }




  }

  ngOnInit(): void {



  }


  guardar(sucursalObj: Sucursal) {
    
    if (this.sucursalesForm.invalid) {
      this.validarTodo();
      Swal.fire("Empleados", "Todos los campos son requeridos", "warning");
      return;

    }



    if (this.IdSucursal == undefined) {
 



        
      this.sucursales.repetido(this.sucursalesForm.get('nombre')?.value).subscribe( res=> {
                 
            if(res==true)
            {
              Swal.fire("Empleados", "Esta sucursal ya existe", "warning");
            }
            else
            {


              this.sucursales.guardarDatos(sucursalObj).subscribe(res => {
                this.toastr.success("Registro exitoso");
                this.router.navigate(['menuPrincipal/listarSucursales']);
        
              }, error => {
                this.toastr.error("Error al guardar");
        
              });


            }

      },error=>{
        console.log(error);
      });


    



    } else {
       //proceso de editar 
       
       if(this.sucursalRepetido == sucursalObj.nombre)
       {
       
        this.editar(this.IdSucursal, sucursalObj)

         
       }
       else{

        this.sucursales.repetido(this.sucursalesForm.get('nombre')?.value).subscribe(res=>
          {
         
            if(res==true)
            {
              Swal.fire("Sucursales", "Esta sucursal ya existe", "warning");
            }else{
                
              
                 this.editar(this.IdSucursal, sucursalObj);
            } 
               
          })

       }


     



    }




  }


  editar(idSucursal: any, sucursaObj: any) {

    

    sucursaObj.idSucursal = this.IdSucursal;
    this.sucursales.editar(idSucursal, sucursaObj).subscribe(res => {

      this.toastr.success("Editado Correctamente");
      this.router.navigate(['menuPrincipal/listarSucursales'])

    }, error => {

      this.toastr.error("Error al editar");

    });


  }










  navegar() {
    this.router.navigate(['menuPrincipal/listarSucursales']);

  }


  listarCiudad() {

    this.ciudades.listar().subscribe(res => {


      this.ciudadList = res;


    });


  }



  unSucursal(id: any) {
    this.sucursales.unRegistro(id).subscribe(res => {


      //primero se llena el combo y luego se asigna el objeto 
      this.listarCiudad();
      this.sucursalesForm.patchValue(Object.assign({}, res));

      this.sucursalRepetido = this.sucursalesForm.get('nombre')?.value
     
    });

 


  }







  validarTodo() {
    for (const key of Object.keys(this.sucursalesForm.controls)) {
      if (this.sucursalesForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.sucursalesForm.controls[key].markAsTouched();
      }

    }
  }

}
