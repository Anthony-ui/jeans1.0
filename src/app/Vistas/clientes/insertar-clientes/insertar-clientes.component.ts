import { trimValidator } from './../../../validadores';
import { ClientesService } from './../../../Servicios/clientes.service';
import { error } from 'protractor';
import { SucursalesService } from 'src/app/Servicios/sucursales.service';
import { Sucursal } from './../../../Clases/sucursal';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-insertar-clientes',
  templateUrl: './insertar-clientes.component.html',
  styleUrls: ['./insertar-clientes.component.css']
})
export class InsertarClientesComponent implements OnInit {

  sucursalList: Sucursal[] = [];
  idCliente: any;
  combo: any;
  clienteCedula="";


  clientesForm = new FormGroup({

    esPasaporte: new FormControl('', trimValidator),
    cedula: new FormControl('', trimValidator),
    nombre: new FormControl('', trimValidator),
    apellido: new FormControl('',trimValidator),
    direccion: new FormControl('', trimValidator),
    celular: new FormControl('', trimValidator),
    correo: new FormControl('', Validators.email),
    idSucursal: new FormControl(''),


  })


  constructor(

    private el: ElementRef,
    private router: Router,
    private sucursales: SucursalesService,
    private toastr: ToastrService,
    private clientes: ClientesService,
    private rutaActiva: ActivatedRoute


  ) { }

  ngOnInit(): void {


    this.idCliente = this.rutaActiva.snapshot.params.id;

    this.listarSucursal();

    if (this.idCliente != undefined) {

      this.unRegistro(this.idCliente);
    }


  }




  listarSucursal() {

    this.sucursales.listar().subscribe(res => {

      this.sucursalList = res;


    }, error => console.log(error))



  }



  guardar(clientesObj: any) {

    if (this.clientesForm.invalid) {

      this.validarTodo();

      Swal.fire("Clientes", "Todos los campos son requeridos", "warning");

      return;

    }








    if (this.idCliente == undefined && this.clientesForm.get('esPasaporte')?.value == "False") {









      this.clientes.repetido(this.clientesForm.get('cedula')?.value,localStorage.getItem('sucursal')).subscribe(res => {



        if (res == true) {


          Swal.fire("Clientes", "Este usuario ya ha sido Registrado", "warning");

        } else if (res == null) {

          Swal.fire("Clientes", "Cedula Incorrecta", "warning");

        }
        else {

            clientesObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
            this.clientes.guardarDatos(clientesObj).subscribe(res => {
            this.toastr.success("Registro exitoso");
            this.router.navigate(['menuPrincipal/listarClientes']);

          }, error => {
            this.toastr.error("Error al guardar");

          });


        }

      }, error => {
        console.log(error);
      });






    } else if (this.idCliente != undefined && this.clientesForm.get('esPasaporte')?.value == "True") {
      
      
      this.clientes.compararCliente(clientesObj.cedula,localStorage.getItem('sucursal')).subscribe(res=>{



        if(res.length==0){

          clientesObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
          this.clientes.guardarDatos(clientesObj).subscribe(res => {
          this.toastr.success("Editado Correctamente");
          this.router.navigate(['menuPrincipal/listarClientes']);
  
        }, error => {
          this.toastr.error("Error al guardar");
  
        });

          
        }else

        {
          if(res[0]["idCliente"] == this.idCliente)
          {
  
            
          clientesObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
          this.clientes.guardarDatos(clientesObj).subscribe(res => {
          this.toastr.success("Editado Correctamente");
          this.router.navigate(['menuPrincipal/listarClientes']);
  
        }, error => {
          this.toastr.error("Error al guardar");
  
        });
  
  
              
          }else
  
  
          {
            Swal.fire("Clientes", "Pasaporte ya registrado", "warning");
            return
  
          }
  
        }

    
      },error=>console.log(error))

    

    }else if(clientesObj.esPasaporte == "True" || this.idCliente==undefined)
    {
      this.clientes.repetidoPasaporte(clientesObj.cedula,localStorage.getItem('sucursal')).subscribe(res=>{
        if (res==true){
           
          Swal.fire("Clientes", "Pasaporte ya registrado", "warning");
          return
        }
        if(res==false)
        {
            clientesObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
            this.clientes.guardarDatos(clientesObj).subscribe(res => {
            this.toastr.success("Editado Correctamente");
            this.router.navigate(['menuPrincipal/listarClientes']);

          }, error => {
            this.toastr.error("Error al guardar");

          });

        }

      },error=>error)
 
    }


   

    if (this.idCliente != undefined && this.clientesForm.get('esPasaporte')?.value == "False") {
    
 

        this.clientes.repetido(clientesObj.cedula, localStorage.getItem('sucursal')).subscribe(res => {

          if (res == null) {

            Swal.fire("Clientes", "La cedula es Incorrecta", "warning");

            return


          } if (res == true) {

            

            this.clientes.compararCliente(clientesObj.cedula,localStorage.getItem('sucursal')).subscribe(res => {



              // console.log(res);
              
            

                 if(res[0]["idCliente"] == this.idCliente)
                 {
                clientesObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
                clientesObj.idCliente = this.idCliente;
                this.clientes.editar(this.idCliente, clientesObj).subscribe(res => {
                this.toastr.success("Editado Correctamente");
                this.router.navigate(['menuPrincipal/listarClientes'])
    
              }, error => {
                console.log(error);
              })
                    
                 }
                 else{
                   
                  Swal.fire("Clientes", "El  Cedula ya existe ", "warning");
                 }

      
            }, error => console.log(error))
          

            return

          }

          if(res== false)
          {

           
            
              clientesObj.idCliente = this.idCliente;
              clientesObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
              this.clientes.editar(this.idCliente, clientesObj).subscribe(res => {
                this.toastr.success("Editado Correctamente");
                this.router.navigate(['menuPrincipal/listarClientes'])
    
              }, error => {
                console.log(error);
              })
          }
        });








     }
 



  }



  validarTodo() {


    for (const key of Object.keys(this.clientesForm.controls)) {
      if (this.clientesForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.clientesForm.controls[key].markAsTouched();
      }

    }
  }


  unRegistro(id: any) {
    this.clientes.unRegistro(id).subscribe(res => {


      this.combo = res;


      this.clientesForm.patchValue(Object.assign({}, res));
      if (this.combo.esPasaporte == true) {
        this.clientesForm.controls['esPasaporte'].setValue("True");
      }


      if (this.combo.esPasaporte == false) {
        this.clientesForm.controls['esPasaporte'].setValue("False");
      }


      this.clienteCedula=this.clientesForm.get('cedula')?.value;
    


     

    });

  }













  navegar() {
    this.router.navigate(['/menuPrincipal/listarClientes']);

  }

}
