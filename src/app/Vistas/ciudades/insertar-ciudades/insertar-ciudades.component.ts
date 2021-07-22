import { Provincia } from './../../../Clases/provincia';
import { ProvinciaService } from './../../../Servicios/provincia.service';
import { CiudadService } from 'src/app/Servicios/ciudad.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/Clases/ciudad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-ciudades',
  templateUrl: './insertar-ciudades.component.html',
  styleUrls: ['./insertar-ciudades.component.css']
})
export class InsertarCiudadesComponent implements OnInit {

  idCiudad:any;
  ciudadesList:Ciudad[]=[];
  ProvinciaList:Provincia[]=[];


  
  ciudadForm = new FormGroup({


  nombre: new FormControl('', Validators.required),
  idProvincia: new FormControl('', Validators.required)
    


  });


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private el: ElementRef,
    private ciudades: CiudadService,
    private rutaActiva: ActivatedRoute,
    private provincia: ProvinciaService

  ) {

    this.idCiudad = this.rutaActiva.snapshot.params.id;



  
     
    if (this.idCiudad != undefined) {
   

      this.unciudad(this.idCiudad);




    }

     





  }

  ngOnInit(): void {

    this.listarProvincia();



  }


  guardar(ciudadObj: Ciudad) {


    
    if (this.ciudadForm.invalid) {
      this.validarTodo();
      Swal.fire("ciudades", "Todos los campos son requeridos", "warning");
      return;

    }



    if (this.idCiudad == undefined) {
 



        
      this.ciudades.repetido(this.ciudadForm.get('nombre')?.value).subscribe( res=> {
                 
            if(res==true)
            {
              Swal.fire("ciudades", "Esta ciudad ya existe", "warning");
            }
            else
            {


              this.ciudades.guardarDatos(ciudadObj).subscribe(res => {
                this.toastr.success("Registro exitoso");
                this.router.navigate(['menuPrincipal/listarCiudades']);
        
              }, error => {
                this.toastr.error("Error al guardar");
        
              });


            }

      },error=>{
        console.log(error);
      });


    



    } else {
      //proceso de editar

      this.editar(this.idCiudad, ciudadObj);


    }




  }


  editar(idCiudad: any, sucursaObj: any) {

    sucursaObj.idCiudad = this.idCiudad;
    this.ciudades.editar(idCiudad, sucursaObj).subscribe(res => {

      this.toastr.success("Editado Correctamente");
      this.router.navigate(['menuPrincipal/listarCiudades'])

    }, error => {

      this.toastr.error("Error al editar");

    });


  }










  navegar() {
    this.router.navigate(['menuPrincipal/listarCiudades']);

  }





  unciudad(id: any) {
    this.ciudades.unRegistro(id).subscribe(res => {


      //primero se llena el combo y luego se asigna el objeto 
      // this.listarCiudad();
      this.ciudadForm.patchValue(Object.assign({}, res));
    });

  }






  validarTodo() {
    for (const key of Object.keys(this.ciudadForm.controls)) {
      if (this.ciudadForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.ciudadForm.controls[key].markAsTouched();
      }

    }
  }



  listarProvincia()
  { 
    this.provincia.listar().subscribe(res=>{
      this.ProvinciaList=res;




    },error=> console.log(error))


  }

}
