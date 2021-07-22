import Swal from 'sweetalert2';
import { Empleado } from './../../Clases/empleado';
import { NgSelectConfig } from '@ng-select/ng-select';
import { EmpleadosService } from './../../Servicios/empleados.service';
import { SucursalesService } from './../../Servicios/sucursales.service';
import { RolesService } from './../../Servicios/roles.service';
import { ToastrService } from 'ngx-toastr';
import { trimValidator, edadMinima } from './../../validadores';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Rol } from './../../Clases/rol';
import { Sucursal } from './../../Clases/sucursal';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  photo: any;
  sucursalList: Sucursal[] = [];
  rollList: Rol[] = [];
  idEmpleado: number = 0;
  empleadoModel: any;
  bool: string = "";
  ruta: string = "";
  rutaServer: string = "";
  inputRuta: any = "";
  archivo: any;
  archivo2: any;
  foto: any;
  foto2: any;
  inputFile2: any;
  cedula: string = "";
  usuario: string = "";
  esPas: string = "";








  empleadosForm = new FormGroup({

    esPasaporte: new FormControl('', Validators.required),
    cedula: new FormControl('', trimValidator),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    usuario: new FormControl('', Validators.required),
    edad: new FormControl('', edadMinima),
    contra: new FormControl('', Validators.required),
    fechaRegistro: new FormControl(''),
    idSucursal: new FormControl(''),
    idRol: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),

  });


  loginForm = new FormGroup({
    sucursales: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required)
  });





  constructor(private toastr: ToastrService,
    private roles: RolesService,
    private sucursales: SucursalesService,
    private empleados: EmpleadosService,
    private router: Router,
    private routerActivo: ActivatedRoute,
    private el: ElementRef,
    private config: NgSelectConfig

  ) {
    this.config.notFoundText = 'No existen coincidencia';
    this.config.placeholder = "SDFDFDFDFD";




    //recoge el parametro enviado por url
    this.idEmpleado = this.routerActivo.snapshot.params.id;

  }

  ngOnInit(): void {

    if (this.idEmpleado == undefined) {

      this.listarSucursales();
      this.listarRoles();

    } else {

      this.unEmpleado();
      this.listarSucursales();
      this.listarRoles();


    }





  }


  listarSucursales() {
    this.sucursales.listar().subscribe(res => {
      this.sucursalList = res
    }, error => {

    }
    );

  }


  listarRoles() {
    this.roles.listar().subscribe(res => {
      this.rollList = res;
    }, error => {


    });
  }



  //asigna la imagen al img src en el html

  asignarImagen(event: any): void {

    if (event.target.files && event.target.files[0]) {
      this.archivo = <File>event.target.files[0];

      if (this.archivo.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = e =>

          this.foto = reader.result;
        reader.readAsDataURL(this.archivo);
      } else {
        this.toastr.error('Archivo incompatible');
      }

    }




  }

  asignarImagen2(event: any): void {


    if (event.target.files && event.target.files[0]) {

      this.archivo2 = <File>event.target.files[0];


      if (this.archivo2.type.match('image.*')) {

        const reader2 = new FileReader();
        reader2.onload = e =>

          this.foto2 = reader2.result;
        reader2.readAsDataURL(this.archivo2);










      } else {
        this.toastr.error('Archivo incompatible');
      }

    }




  }


  guardar(empleadoObj: Empleado) {





    var esPasaporte = this.empleadosForm.get('esPasaporte')?.value


    if (esPasaporte == "") {

      Swal.fire("Empleados", "Todos los campos son requeridos", "warning");
      this.validarTodo();

      return;
    }







    if (esPasaporte == "True" && this.idEmpleado == undefined) {

















      let usuario = this.empleadosForm.get('usuario')?.value;







      //guarda

      if (this.archivo == null) {


        Swal.fire("Empleados", "Debe agregar una foto", "warning");
        return;
      }




      if (this.empleadosForm.invalid) {

        Swal.fire("Empleados", "Llene todos los campos", "warning");
        return;
      }




      this.empleados.repetidoPasaporte(empleadoObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {

        if (res == true) {
          Swal.fire("Empleados", "El pasaporte ya esta registrado", "warning");
          return;
        }

        if (res == false) {

          this.empleados.repetidoUsuario(usuario).subscribe(res => {




            if (res == "true") {

              Swal.fire('Empleados', 'El nombre de  usuario ya existe ', 'warning');


            }
            else {





              this.empleados.subirImagen(this.archivo, empleadoObj.cedula).subscribe(x => {
                if (x != "error") {


                  let sucursal = localStorage.getItem('sucursal');
                  empleadoObj.imagen = x.toString();
                  empleadoObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');

                  this.empleados.guardarDatos(empleadoObj).subscribe(y => {

                    this.toastr.success("Registro exitoso");
                    this.router.navigate(['menuPrincipal/listarEmpleados']);


                  }, error => {

                    Swal.fire('Empleados', 'Error al Guardar  ', 'warning');

                  });

                } else {

                  Swal.fire('Empleados', 'Error al Guardar  ', 'warning');

                }
              });





            }
          }, error => {
            console.log(error);
          });



        }

      }, error => console.log(error))







































    }






    //si es pasaporte  se gurada sin verificar la cedula caso contrario verifica la cedula 
    if (esPasaporte == "False" && this.idEmpleado == undefined) {






      let usuario = this.empleadosForm.get('usuario')?.value;







      //guarda

      if (this.archivo == null) {


        Swal.fire("Empleados", "Debe agregar una foto", "warning");
        return;
      }




      if (this.empleadosForm.invalid) {

        Swal.fire("Empleados", "Llene todos los campos", "warning");
        return;
      }



      //verifica si la cedula es valida
      let cedula = this.empleadosForm.get('cedula')?.value;

      this.empleados.repetido(cedula, localStorage.getItem('sucursal')).subscribe(res => {








        if (res == true) {
          Swal.fire("Empleados", "Esta cedula ya ha sido registrada", "warning");

          return;

        }
        else {


          if (res === null) {
            Swal.fire("Empleados", "La cedula es incorrecta", "warning");

            return;
          }



          this.empleados.repetidoUsuario(usuario).subscribe(res => {
            if (res == "true") {

              Swal.fire("Empleados", "Este usuario ya esta registrado", "warning");


            } else {





              this.empleados.subirImagen(this.archivo, empleadoObj.cedula).subscribe(x => {
                if (x != "error") {

                  empleadoObj.imagen = x.toString();
                  empleadoObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');

                  this.empleados.guardarDatos(empleadoObj).subscribe(res => {

                    this.toastr.success("Registro exitoso");
                    this.router.navigate(['menuPrincipal/listarEmpleados']);


                  }, error => {

                    Swal.fire('Empleados', 'Error al Guardar  ', 'warning');

                  });

                } else {

                  Swal.fire('Empleados', 'Error al Guardar  ', 'warning');

                }
              });





            }
          });












        }
      });







































      //if de cedula
    } else if (this.idEmpleado != undefined) {



      if (this.archivo2 == undefined) {




        //compara si se ha cambiado la cedula


        if (empleadoObj.cedula != this.cedula && esPasaporte == "False") {



          //si se cambia la cedula

          this.empleados.repetido(empleadoObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {



            if (res == null) {

              Swal.fire("Empleados", "La cedula es incorrecta", "warning");

              return

            }

            if (res == true) {
              Swal.fire("Empleados", "La cedula ya esta registrada", "warning");
              return

            }

            if (res == false) {





              //si la cedula no existe se manda el guardar
              //  si el archivo no existe se manda solo la ruta del input hide 
              empleadoObj.idUsuario = this.idEmpleado;
              empleadoObj.imagen = this.inputRuta.toString();
              this.empleados.editar(this.idEmpleado, empleadoObj).subscribe(res => {
                this.toastr.success("Perfil Editado Correctamente");
                this.router.navigate(['login']);
                localStorage.clear();

              });





            }






          }, error => {
            console.log(error);
          });



        } else if (empleadoObj.cedula == this.cedula && esPasaporte == "False" && empleadoObj.usuario == this.usuario) {



          var dato = this.empleadosForm.get('cedula')?.value;
          var valoresAceptados = /^[0-9]+$/;
          if (dato.match(valoresAceptados)) {



            //si la cedula no existe se manda el guardar
            //  si el archivo no existe se manda solo la ruta del input hide 

            this.empleados.repetido(empleadoObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {


              if (res == true) {
                empleadoObj.idUsuario = this.idEmpleado;
                empleadoObj.imagen = this.inputRuta.toString();


                this.empleados.editar(this.idEmpleado, empleadoObj).subscribe(res => {
                  this.toastr.success("Perfil Editado Correctamente");
           
                  this.router.navigate(['login']);
                  localStorage.clear();

                  return

                });


              }

              if (res == null) {
                Swal.fire("Empleados", "Cedula Incorrecta", "warning");
                return
              }


            });
          }
          else {

            Swal.fire("Empleados", "Caracteres no permitido en la cedula", "warning");
            return;
          }



        }


        else if (empleadoObj.usuario != this.usuario) {




          this.empleados.repetidoUsuario(empleadoObj.usuario).subscribe(res => {

            if (res == "true") {
              Swal.fire("Empleados", "Este usuario ya esta registrado", "warning");
              this.el.nativeElement.querySelector('usuario').focus();
              return
            }

            if (res == "false") {
              //si no se cambia nada hace esto

              empleadoObj.idUsuario = this.idEmpleado;
              empleadoObj.imagen = this.inputRuta.toString();
              this.empleados.editar(this.idEmpleado, empleadoObj).subscribe(res => {
                this.toastr.success("Perfil Editado Correctamente");
                this.router.navigate(['login']);
                localStorage.clear();

              });



            }

          })
        }



        else {


          //si no se cambia nada hace esto



          this.empleados.comparar(empleadoObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {




            if (res.length == 0) {


              empleadoObj.idUsuario = this.idEmpleado;
              empleadoObj.imagen = this.inputRuta.toString();
              this.empleados.editar(this.idEmpleado, empleadoObj).subscribe(res => {

                this.toastr.success("Perfil Editado Correctamente");
                this.router.navigate(['login']);
                localStorage.clear();



              });




            } else {





              if (res[0]["idUsuario"] == this.idEmpleado) {

                empleadoObj.idUsuario = this.idEmpleado;
                empleadoObj.imagen = this.inputRuta.toString();


                this.empleados.editar(this.idEmpleado, empleadoObj).subscribe(res => {
             
                  this.toastr.success("Perfil Editado Correctamente");
                  this.router.navigate(['login']);
                  localStorage.clear();



                });


              }
              else {
                Swal.fire("Empleados", "Este Pasaporte ya esta registrado", "warning");
              }




            }



          }, error => console.log(error))
          {



          }







        }




      }

      if (this.archivo2 != undefined) {

        //si existe se manda el archivo 2 para que se sobreescriba y se asiga la ruta que devuelve del controlados 


        this.empleados.subirImagen(this.archivo2, empleadoObj.cedula).subscribe(x => {


          empleadoObj.idUsuario = this.idEmpleado;
          empleadoObj.imagen = x.toString();
          this.empleados.editar(this.idEmpleado, empleadoObj).subscribe(res => {
         
            this.toastr.success("Perfil Editado Correctamente");
            this.router.navigate(['login']);
            localStorage.clear();

          });

        });
      }


    }




















  }




  unEmpleado() {

    this.empleados.unRegistro(this.idEmpleado).subscribe(res => {



      this.empleadoModel = res;
      this.ruta = "https://localhost:44396/" + this.empleadoModel.imagen




      //asignar a input aparte la imagen


      this.inputRuta = this.empleadoModel.imagen;

      if (this.empleadoModel.esPasaporte == true) {

        this.bool = "True";

      }

      if (this.empleadoModel.esPasaporte == false) {

        this.bool = "False";
      }




      this.empleadosForm.setValue({

        esPasaporte: this.bool,
        cedula: this.empleadoModel.cedula,
        nombre: this.empleadoModel.nombre,
        apellido: this.empleadoModel.apellido,
        direccion: this.empleadoModel.direccion,
        celular: this.empleadoModel.celular,
        correo: this.empleadoModel.correo,
        usuario: this.empleadoModel.usuario,
        edad: this.empleadoModel.edad,
        contra: this.empleadoModel.contra,
        fechaRegistro: this.empleadoModel.fechaRegistro,
        idSucursal: localStorage.getItem('sucursal'),
        idRol: this.empleadoModel.idRol,
        imagen: '',


      })
      this.bool = "";

      //asigna la cedula para comprobar si se ha cambiado el editar
      this.cedula = this.empleadosForm.get('cedula')?.value;
      this.usuario = this.empleadosForm.get('usuario')?.value;
      this.esPas = this.empleadosForm.get('esPasaporte')?.value

    },
      error => {

      })

  }

  repetidoUsuario() {

    let usuario = this.empleadosForm.get('usuario')?.value;

    this.empleados.repetidoUsuario(usuario).subscribe(res => {

      if (res == "true") {
        return "existe";

      }
      else {

        return "no existe";

      }


    });
  }



  validarTodo() {
    for (const key of Object.keys(this.empleadosForm.controls)) {
      if (this.empleadosForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.empleadosForm.controls[key].markAsTouched();
      }

    }
  }
}
