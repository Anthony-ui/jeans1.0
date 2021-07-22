import { trimValidator,negativos } from './../../../validadores';
import { error } from 'protractor';
import { ProveedoresService } from './../../../Servicios/proveedores.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciudad } from './../../../Clases/ciudad';
import { SucursalesService } from './../../../Servicios/sucursales.service';
import { Sucursal } from './../../../Clases/sucursal';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CiudadService } from 'src/app/Servicios/ciudad.service';
import Swal from 'sweetalert2';
import { Proveedor } from 'src/app/Clases/proveedor';




@Component({

  selector: 'app-insertar-proveedores',
  templateUrl: './insertar-proveedores.component.html',
  styleUrls: ['./insertar-proveedores.component.css']
  
})
export class InsertarProveedoresComponent implements OnInit {
  sucursalesList: Sucursal[] = [];
  ciudadesList: Ciudad[] = [];
  IdProveedor: any;
  objeto: any;
  objetoEsPasaporte: any;
  cedula: string = "";



  proveedoresForm = new FormGroup({


    esPasaporte: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', trimValidator),
    telefono: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    idCiudad: new FormControl('', Validators.required),
    idSucursal: new FormControl(''),



  });


  constructor(
    private proveedores: ProveedoresService,
    private sucursales: SucursalesService,
    private ciudades: CiudadService,
    private router: Router,
    private toastr: ToastrService,
    private rutaActiva: ActivatedRoute,
    private el: ElementRef


  ) {
    this.IdProveedor = this.rutaActiva.snapshot.params.id;



  }

  ngOnInit(): void {
    if (this.IdProveedor == undefined) {
      this.ListarSucursales();
      this.ListarCiudades();

    } else {
      this.ListarSucursales();
      this.ListarCiudades();
      this.unProveedor(this.IdProveedor);



    }


  }

  ListarSucursales() {
    this.sucursales.listar().subscribe(res => {

      this.sucursalesList = res;

    }, error => {

      console.log(error);

    });
  }


  ListarCiudades() {
    this.ciudades.listar().subscribe(res => {

      this.ciudadesList = res;

    }, error => {

      console.log(error);

    });
  }




  guardar(proveedorObj: Proveedor) {




    if (this.proveedoresForm.invalid) {
      this.validarTodo();
      Swal.fire("Empleados", "Todos los campos son requeridos", "warning");
      return;

    }



    if (this.IdProveedor == undefined) {

      this.objetoEsPasaporte = proveedorObj;

      if (this.objetoEsPasaporte.esPasaporte == "True") {
  

        this.proveedores.repetidoPasaporte(proveedorObj.cedula,localStorage.getItem('sucursal')).subscribe(res=>{
          
            if(res==true)
            {
               
              Swal.fire("Empleados", "Este Proveedor ya Existe", "warning");
                    
            }
            if(res == false)
            {
              
                this.guardarDatos(proveedorObj);
            }

        },error=>console.log(error))

        

     

      }




      if (this.objetoEsPasaporte.esPasaporte == "False") {
   

        this.proveedores.repetido(this.proveedoresForm.get('cedula')?.value, localStorage.getItem('sucursal')).subscribe(res => {

          if (res == true) {
            Swal.fire("Proveedores", "Esta Proveedor ya existe", "warning");
            return

          } else if (res == null) {

            Swal.fire("Proveedores", "Cedula incorrecta", "warning");
            return;

          } else {
            this.guardarDatos(proveedorObj);

          }








        }, error => {
          console.log(error);
        });

      }













    } else {


      // alert(this.cedula);
      // alert(proveedorObj.cedula);



      if (this.cedula != proveedorObj.cedula && this.proveedoresForm.get('esPasaporte')?.value == "True") {
     
     
        this.proveedores.repetidoPasaporte(proveedorObj.cedula,localStorage.getItem('sucursal')).subscribe(res => {



          if (res == true) {

            Swal.fire("Proveedores", "Esta Proveedor ya existe", "warning");
            
            return
          }

          if (res == false) {

            this.editar(this.IdProveedor, proveedorObj);

          }
        }, error => console.log(error));

        return
      } else if (this.cedula != proveedorObj.cedula && this.proveedoresForm.get('esPasaporte')?.value == "False") {
    

        var dato = this.proveedoresForm.get('cedula')?.value;

        var valoresAceptados = /^[0-9]+$/;

        if (dato.match(valoresAceptados)) {

          this.proveedores.repetido(proveedorObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {


            if (res == null) {

              Swal.fire("Proveedores", "La cedula es Incorrecta", "warning");

              return
            }
            if (res == true) {

              Swal.fire("Proveedores", "Esta Cedula ya existe", "warning");

              return

            } else {

              this.editar(this.IdProveedor, proveedorObj);
            }

          }, error => console.log(error))
        } else {

          Swal.fire("Proveedores", "Caracteres no permitido", "warning");

          return
        }


      }
      else if(this.cedula == proveedorObj.cedula && this.proveedoresForm.get('esPasaporte')?.value == "False"){
       
        
        this.proveedores.repetido(proveedorObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {


          if (res == null) {

            Swal.fire("Proveedores", "La cedula es Incorrecta", "warning");

            return
          }
          // if (res == true) {

          //   Swal.fire("Proveedores", "Esta Cedula ya existe", "warning");

          //   return

          // } else 
          {

            this.editar(this.IdProveedor, proveedorObj);
          }

        }, error => console.log(error))
        
   

      } 
      else{


        if (this.cedula == proveedorObj.cedula && this.proveedoresForm.get('esPasaporte')?.value == "True") {
          
          

          this.editar(this.IdProveedor, proveedorObj);

        }
        else if (this.cedula == proveedorObj.cedula && this.proveedoresForm.get('esPasaporte')?.value == "False") {
        

       



          var dato = this.proveedoresForm.get('cedula')?.value;

          var valoresAceptados = /^[0-9]+$/;

          if (dato.match(valoresAceptados)) {

            this.proveedores.repetido(proveedorObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {

              if (res == null) {

                Swal.fire("Proveedores", "La cedula es Incorrecta", "warning");

                return


              } if (res == true) {


                this.proveedores.compararProveedor(proveedorObj.cedula,localStorage.getItem('sucursal')).subscribe(res => {


                  if (res[0]["idProveedor"] == this.IdProveedor) {

                    this.editar(this.IdProveedor, proveedorObj);

                    return

                  } else {

                    Swal.fire("Proveedores", "Esta Cedula ya existe", "warning");

                    return

                  }
                });



              }
            })

          }
          else {

            Swal.fire("Empleados", "Caracteres no permitido", "warning");

            return;
          }


        }
        else {

          this.editar(this.IdProveedor, proveedorObj);
        }

      }






    }




  }


  guardarDatos(proveedorObj: any) {
    proveedorObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
    this.proveedores.guardarDatos(proveedorObj).subscribe(res => {

      this.toastr.success("Registro exitoso");

      this.router.navigate(['menuPrincipal/listarProveedores']);

    }, error => {
      this.toastr.error("Error al guardar");

    });
  }



  editar(idProveedor: any, proveedorObj: any) {
    proveedorObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
    proveedorObj.idProveedor = this.IdProveedor;
    this.proveedores.editar(idProveedor, proveedorObj).subscribe(res => {

      this.toastr.success("Editado Correctamente");
      this.router.navigate(['menuPrincipal/listarProveedores'])

    }, error => {

      this.toastr.error("Error al editar");

    });


  }










  navegar() {
    this.router.navigate(['menuPrincipal']);

  }





  unProveedor(id: any) {
    this.proveedores.unRegistro(id).subscribe(res => {

      //primero se llena el combo y luego se asigna el objeto
      // this.listarCiudad();

      this.objeto = res;


      this.proveedoresForm.patchValue(Object.assign({}, res));

      if (this.objeto.esPasaporte == true) {
        this.proveedoresForm.controls['esPasaporte'].setValue("True");
      }


      if (this.objeto.esPasaporte == false) {
        this.proveedoresForm.controls['esPasaporte'].setValue("False");
      }

      this.cedula = this.proveedoresForm.get('cedula')?.value;

    });

  }







  validarTodo() {
    for (const key of Object.keys(this.proveedoresForm.controls)) {
      if (this.proveedoresForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        // invalidControl.focus();
        this.proveedoresForm.controls[key].markAsTouched();
      }

    }
  }



}
