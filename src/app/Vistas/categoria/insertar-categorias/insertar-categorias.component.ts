import { trimValidator } from './../../../validadores';
import { CategoriasService } from './../../../Servicios/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalesService } from './../../../Servicios/sucursales.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/Clases/categoria';
import { Sucursal } from 'src/app/Clases/sucursal';


@Component({
  selector: 'app-insertar-categorias',
  templateUrl: './insertar-categorias.component.html',
  styleUrls: ['./insertar-categorias.component.css']
})
export class InsertarCategoriasComponent implements OnInit {
  idCategoria:any;
  categoriasList:Categoria[]=[];
  sucursalesList:Sucursal[]=[];

  
  categoriaForm = new FormGroup({


    nombre: new FormControl('', trimValidator),
    descripcion: new FormControl('', trimValidator),
    idSucursal: new FormControl(''),
    


  });


  constructor(
    private router: Router,
    private sucursales: SucursalesService,
    private toastr: ToastrService,
    private el: ElementRef,
    private categorias: CategoriasService,
    private rutaActiva: ActivatedRoute

  ) {

    this.idCategoria = this.rutaActiva.snapshot.params.id;
     
    if (this.idCategoria == undefined) {
      // this.listarCiudad();




    } else {

      this.unSucursal(this.idCategoria);



    }



  }

  ngOnInit(): void {

    this.listarSucursal();



  }


  guardar(categorialObj: Categoria) {


    
    if (this.categoriaForm.invalid) {
      this.validarTodo();
      Swal.fire("Empleados", "Todos los campos son requeridos", "warning");
      return;

    }



    if (this.idCategoria == undefined) {
 



        
      this.categorias.repetido(this.categoriaForm.get('nombre')?.value).subscribe( res=> {
                 
            if(res==true)
            {
              Swal.fire("Categorias", "Esta Categoria ya existe", "warning");
            }
            else
            {
                  categorialObj.idSucursal= parseInt( JSON.parse( JSON.stringify (localStorage.getItem('sucursal'))));
    
            
                
                this.categorias.guardarDatos(categorialObj).subscribe(res => {
                this.toastr.success("Registro exitoso");
                this.router.navigate(['menuPrincipal/listarCategorias']);
        
              }, error => {
                this.toastr.error("Error al guardar");
        
              });


            }

      },error=>{
        console.log(error);
      });


    



    } else {
      //proceso de editar

      this.editar(this.idCategoria, categorialObj);


    }




  }


  editar(idCategoria: any, sucursaObj: any) {


    sucursaObj.idCategoria = this.idCategoria;
    this.categorias.editar(idCategoria, sucursaObj).subscribe(res => {

      this.toastr.success("Editado Correctamente");
      this.router.navigate(['menuPrincipal/listarCategorias'])

    }, error => {

      this.toastr.error("Error al editar");

    });


  }










  navegar() {
    this.router.navigate(['menuPrincipal/listarCategorias']);

  }


  // listarCiudad() {

  //   this.ciudades.listar().subscribe(res => {


  //     this.ciudadList = res;


  //   });


  // }



  unSucursal(id: any) {
    this.categorias.unRegistro(id).subscribe(res => {


      //primero se llena el combo y luego se asigna el objeto 
      // this.listarCiudad();
      this.categoriaForm.patchValue(Object.assign({}, res));
    });

  }







  validarTodo() {
    for (const key of Object.keys(this.categoriaForm.controls)) {
      if (this.categoriaForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.categoriaForm.controls[key].markAsTouched();
      }

    }
  }


  listarSucursal()
  { 
    this.sucursales.listar().subscribe(res=>{
      this.sucursalesList=res;




    },error=> console.log(error))


  }
}
