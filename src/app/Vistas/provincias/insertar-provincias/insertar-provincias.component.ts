import { ProvinciaService } from './../../../Servicios/provincia.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Provincia } from './../../../Clases/provincia';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-provincias',
  templateUrl: './insertar-provincias.component.html',
  styleUrls: ['./insertar-provincias.component.css']
})
export class InsertarProvinciasComponent implements OnInit {
  idProvincia:any;
  provinciasList:Provincia[]=[];


  
  provinciaForm = new FormGroup({


  nombre: new FormControl('', Validators.required),
    


  });


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private el: ElementRef,
    private provincias: ProvinciaService,
    private rutaActiva: ActivatedRoute

  ) {

    this.idProvincia = this.rutaActiva.snapshot.params.id;



  
     
    if (this.idProvincia != undefined) {
   

      this.unprovincia(this.idProvincia);




    }

     





  }

  ngOnInit(): void {

    this.listarSucursal();



  }


  guardar(provinciaObj: Provincia) {


    
    if (this.provinciaForm.invalid) {
      this.validarTodo();
      Swal.fire("provincias", "Todos los campos son requeridos", "warning");
      return;

    }



    if (this.idProvincia == undefined) {
 



        
      this.provincias.repetido(this.provinciaForm.get('nombre')?.value).subscribe( res=> {
                 
            if(res==true)
            {
              Swal.fire("provincias", "Esta provincia ya existe", "warning");
            }
            else
            {


              this.provincias.guardarDatos(provinciaObj).subscribe(res => {
                this.toastr.success("Registro exitoso");
                this.router.navigate(['menuPrincipal/listarProvincias']);
        
              }, error => {
                this.toastr.error("Error al guardar");
        
              });


            }

      },error=>{
        console.log(error);
      });


    



    } else {
      //proceso de editar

      this.editar(this.idProvincia, provinciaObj);


    }




  }


  editar(idProvincia: any, sucursaObj: any) {

    sucursaObj.idProvincia = this.idProvincia;
    this.provincias.editar(idProvincia, sucursaObj).subscribe(res => {

      this.toastr.success("Editado Correctamente");
      this.router.navigate(['menuPrincipal/listarProvincias'])

    }, error => {

      this.toastr.error("Error al editar");

    });


  }










  navegar() {
    this.router.navigate(['menuPrincipal/listarProvincias']);

  }





  unprovincia(id: any) {
    this.provincias.unRegistro(id).subscribe(res => {


      //primero se llena el combo y luego se asigna el objeto 
      // this.listarCiudad();
      this.provinciaForm.patchValue(Object.assign({}, res));
    });

  }






  validarTodo() {
    for (const key of Object.keys(this.provinciaForm.controls)) {
      if (this.provinciaForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.provinciaForm.controls[key].markAsTouched();
      }

    }
  }



  listarSucursal()
  { 
    this.provincias.listar().subscribe(res=>{
      this.provinciasList=res;




    },error=> console.log(error))


  }
}
