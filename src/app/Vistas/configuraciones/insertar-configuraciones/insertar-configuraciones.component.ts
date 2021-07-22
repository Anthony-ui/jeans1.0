import { ConfiguracionService } from './../../../Servicios/configuracion.service';
import { Configuracion } from './../../../Clases/configuracion';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-insertar-configuraciones',
  templateUrl: './insertar-configuraciones.component.html',
  styleUrls: ['./insertar-configuraciones.component.css'],
  providers: [DatePipe]
})
export class InsertarConfiguracionesComponent implements OnInit {
  idConfiguracion = "";
  configuracionList: Configuracion[] = [];
  repetidoConfiguracion: any;
  repetidoRuc: any;





  configuracionesForm = new FormGroup({

    identificador: new FormControl('', Validators.required),
    ruc: new FormControl('', Validators.required),
    propietario: new FormControl('', Validators.required),
    autorizacionSri: new FormControl('', Validators.required),
    fechaSriDesde: new FormControl('', Validators.required),
    fechaSriHasta: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    activo: new FormControl(''),


  });

  constructor(
    private router: Router,
    private configuraciones: ConfiguracionService,
    private toastr: ToastrService,
    private el: ElementRef,
    private rutaActiva: ActivatedRoute,
    private datePipe: DatePipe

  ) {
    this.idConfiguracion = this.rutaActiva.snapshot.params.id;

    if (this.idConfiguracion == undefined) {
      this.listarConfiguraciones();




    } else {

      this.unConfiguracion(this.idConfiguracion);
    }



  }

  ngOnInit(): void {



  }


  guardar(configuracionObj: Configuracion) {





    if (this.configuracionesForm.invalid) {
      this.validarTodo();
      Swal.fire("Configuracion", "Todos los campos son requeridos", "warning");
      return;

    }



    if (this.idConfiguracion == undefined) {


      this.configuraciones.repetido(configuracionObj.identificador).subscribe(res => {

        if (res == true) {
          Swal.fire("Configuracion", "El numero de identificador ya esta registrado", "warning");

        } else {

          this.configuraciones.cedula(configuracionObj.ruc, localStorage.getItem('sucursal')).subscribe(res => {

            if (res == true) {
              Swal.fire("Configuracion", "El numero de Cedula es incorrecto", "warning");
            }
            else {

              this.configuraciones.guardarDatos(configuracionObj).subscribe(res => {
                this.toastr.success("Registro exitoso");
                this.router.navigate(['menuPrincipal/listarConfiguraciones']);

              }, error => {
                this.toastr.error("Error al guardar");

              });

            }


          }, error => console.log(error))




        }



      }, error => console.log(error))






    } else {
      //proceso de editar


      if (this.repetidoConfiguracion == configuracionObj.identificador && this.repetidoRuc == configuracionObj.ruc) {


          this.editar(this.idConfiguracion,configuracionObj);






      }else if(this.repetidoConfiguracion != configuracionObj.identificador && this.repetidoRuc == configuracionObj.ruc)
      
      {

        
        this.configuraciones.repetido(configuracionObj.identificador).subscribe(res => {

          if (res == true) {
            Swal.fire("Configuracion", "El numero de identificador ya esta registrado", "warning");

          } else {

            this.configuraciones.cedula(configuracionObj.ruc, localStorage.getItem('sucursal')).subscribe(res => {

              if (res == true) {
                Swal.fire("Configuracion", "El numero de Cedula es incorrecto", "warning");
              }
              else {




                  this.configuraciones.guardarDatos(configuracionObj).subscribe(res => {
                  this.toastr.success("Editado correctamente");
                  this.router.navigate(['menuPrincipal/listarConfiguraciones']);

                }, error => {
                  this.toastr.error("Error al guardar");

                });

              }


            }, error => console.log(error))




          }



        }, error => console.log(error))

      } else if (this.repetidoConfiguracion == configuracionObj.identificador && this.repetidoRuc != configuracionObj.ruc)
      {

       
            this.configuraciones.cedula(configuracionObj.ruc, localStorage.getItem('sucursal')).subscribe(res => {

              if (res == true) {
                Swal.fire("Configuracion", "El numero de Cedula es incorrecto", "warning");
              }
              else {




                  this.configuraciones.guardarDatos(configuracionObj).subscribe(res => {
                  this.toastr.success("Editado correctamente");
                  this.router.navigate(['menuPrincipal/listarConfiguraciones']);

                }, error => {
                  this.toastr.error("Error al guardar");

                });

              }


            }, error => console.log(error))




       







        

      }
      
      
      else {
        this.editar(this.idConfiguracion, configuracionObj);
      }




    }




  }





  editar(idConfiguracion: any, sucursaObj: any) {

    sucursaObj.idConfiguracion = this.idConfiguracion;
    this.configuraciones.editar(idConfiguracion, sucursaObj).subscribe(res => {

      this.toastr.success("Editado Correctamente");
      this.router.navigate(['menuPrincipal/listarConfiguraciones'])

    }, error => {

      this.toastr.error("Error al editar");

    });


  }










  navegar() {
    this.router.navigate(['menuPrincipal/listarConfiguraciones']);

  }


  listarConfiguraciones() {

    this.configuraciones.listar().subscribe(res => {


      this.configuracionList = res;


    });


  }



  unConfiguracion(id: any) {
    this.configuraciones.unRegistro(id).subscribe((res: Configuracion) => {
      res.fechaSriDesde = this.datePipe.transform(res.fechaSriDesde, 'yyyy-MM-dd');
      res.fechaSriHasta = this.datePipe.transform(res.fechaSriHasta, 'yyyy-MM-dd');
      this.listarConfiguraciones();
      this.configuracionesForm.patchValue(Object.assign({}, res));
      this.repetidoConfiguracion = this.configuracionesForm.get('identificador')?.value;
      this.repetidoRuc = this.configuracionesForm.get('ruc')?.value;
    });

  }







  validarTodo() {
    for (const key of Object.keys(this.configuracionesForm.controls)) {
      if (this.configuracionesForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.configuracionesForm.controls[key].markAsTouched();
      }

    }
  }

}
