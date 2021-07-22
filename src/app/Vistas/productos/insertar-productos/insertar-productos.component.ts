import { trimValidator } from './../../../validadores';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from './../../../Servicios/productos.service';
import { error } from 'protractor';
import { ProveedoresService } from './../../../Servicios/proveedores.service';
import { SucursalesService } from 'src/app/Servicios/sucursales.service';
import { CategoriasService } from './../../../Servicios/categorias.service';

import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Clases/categoria';
import { Sucursal } from 'src/app/Clases/sucursal';
import { Proveedor } from 'src/app/Clases/proveedor';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-insertar-productos',
  templateUrl: './insertar-productos.component.html',
  styleUrls: ['./insertar-productos.component.css']
})
export class InsertarProductosComponent implements OnInit {

  productoList = "";
  rolList = "";
  idProducto = "";
  archivo: any;
  archivo2: any;
  foto: any;
  foto2: any;
  categoriaList: Categoria[] = [];
  sucursalesList: Sucursal[] = [];
  proveedoresList: Proveedor[] = [];
  listaProductosObj: any;
  ruta = "";
  inputRuta = "";
  nombre = "";
  comparar: any;
  espere:number=0;




  productosForm = new FormGroup({
    idCategoria: new FormControl('', Validators.required),
    nombre: new FormControl('', trimValidator),
    talla: new FormControl('', trimValidator),
    descripcion: new FormControl('', trimValidator),
    precioCompra: new FormControl('', [Validators.min(0), Validators.required]),
    precioUnidad: new FormControl('', [Validators.min(0), Validators.required]),
    precioDocena: new FormControl('', [Validators.min(0), Validators.required]),
    margenGanancia: new FormControl('', [Validators.min(0), Validators.required]),
    maxDescuento: new FormControl('', [Validators.min(0), Validators.required]),
    imagen: new FormControl(''),
    stock: new FormControl('', [Validators.min(0), Validators.required]),
    idSucursal: new FormControl(''),
    idProveedor: new FormControl('', Validators.required)
  })

  constructor(private categorias: CategoriasService,
    private sucursales: SucursalesService,
    private productos: ProductosService,
    private toastr: ToastrService,
    private el: ElementRef,
    private rutaActiva: ActivatedRoute,
    private router: Router


  ) {


    this.idProducto = this.rutaActiva.snapshot.params.id;

    if (this.idProducto != undefined) {

      this.listarCategorias();
      this.listarProveedores();
      this.unProducto(this.idProducto)




    } else {
      this.listarCategorias();
      this.listarSucursales();
      this.listarProveedores();
    }
  }

  ngOnInit(): void {






  }






  listarCategorias() {

    this.categorias.listar().subscribe(res => {

      this.categoriaList = res;
    }, error => console.log(error))

  }

  listarSucursales() {
    this.sucursales.listar().subscribe(res => {
      this.sucursalesList = res;
    }, error => console.log(error))

  }


  listarProveedores() {

    this.productos.listarProveedor().subscribe(res => {
      this.proveedoresList = res;
      this.espere=1;
    }, error => {
      this.espere=1;
      console.log(error)
    }

    )



  }

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

  guardarProductos(productosObj: any) {







    if (this.idProducto == undefined) {


      if (productosObj.imagen == "") {
        Swal.fire("Productos", "Debe agregar una foto", "warning");
        return
      }




      if (this.productosForm.invalid) {

        Swal.fire("Productos", "Todos los campos son requeridos", "warning");
        this.validarTodo();

        return;
      }




      this.productos.repetido(productosObj.nombre, productosObj.talla, localStorage.getItem('sucursal'), productosObj.idCategoria).subscribe(res => {

        if (res == "true") {
          Swal.fire("Productos", "Este producto ya se encuentra registrado", "warning");
        } else {
          this.productos.subirImagen(this.archivo, productosObj.nombre).subscribe(res => {

            if (res != "error") {

              productosObj.imagen = res.toString();
              productosObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');

              this.productos.guardarDatos(productosObj).subscribe(res => {
                this.toastr.success("Registro exitoso");
                this.router.navigate(['menuPrincipal/listarProductos']);

              }, error => console.log(error))

            }


          }, error => console.log(error))
        }



      })






    } else {





      if (this.archivo2 == undefined) {

        this.productos.comparar(productosObj.nombre, localStorage.getItem('sucursal'), productosObj.idCategoria, productosObj.talla).subscribe(res => {

          this.comparar = res;



          if (this.comparar.length == 0) {


            productosObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
            productosObj.idProducto = this.idProducto;
            productosObj.imagen = this.inputRuta;
            this.productos.editar(this.idProducto, productosObj).subscribe(res => {
              this.toastr.success("Editado Correctamente");
              this.router.navigate(['menuPrincipal/listarProductos']);

            }, error => console.log(error))






          } else {
            if (this.comparar[0].idProducto == this.idProducto) {


              productosObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
              productosObj.idProducto = this.idProducto;
              productosObj.imagen = this.inputRuta;
              this.productos.editar(this.idProducto, productosObj).subscribe(res => {
                this.toastr.success("Editado Correctamente");
                this.router.navigate(['menuPrincipal/listarProductos']);

              }, error => console.log(error))

            } else {

              Swal.fire("Productos", "Este producto ya esta registrado", "warning");
              return


            }

          }







        }, error => console.log(error))




      }


      if (this.archivo2 != undefined) {



        this.productos.comparar(productosObj.nombre, localStorage.getItem('sucursal'), productosObj.idCategoria, productosObj.talla).subscribe(res => {



          this.comparar = res;
           
          if(this.comparar.length == 0)
          {
            
            this.productos.subirImagen(this.archivo2, productosObj.nombre).subscribe(res => {



              if (res != "error") {

                productosObj.imagen = res.toString();
                productosObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
                productosObj.idProducto = this.idProducto;

                this.productos.editar(this.idProducto, productosObj).subscribe(res => {
                  this.toastr.success("Editado Correctamente");
                  this.router.navigate(['menuPrincipal/listarProductos']);

                }, error => console.log(error))

              }


            }, error => console.log(error))

          }else
          {
            

            if (this.comparar[0].idProducto == this.idProducto) {



              this.productos.subirImagen(this.archivo2, productosObj.nombre).subscribe(res => {
  
  
  
                if (res != "error") {
  
                  productosObj.imagen = res.toString();
                  productosObj.idSucursal = JSON.parse(localStorage.getItem('sucursal') || '{}');
                  productosObj.idProducto = this.idProducto;
  
                  this.productos.editar(this.idProducto, productosObj).subscribe(res => {
                    this.toastr.success("Editado Correctamente");
                    this.router.navigate(['menuPrincipal/listarProductos']);
  
                  }, error => console.log(error))
  
                }
  
  
              }, error => console.log(error))
  
  
  
            } else {
              Swal.fire("Productos", "Este producto ya esta registrado", "warning");
              return
  
            }





          }




  

         


        }, error => console.log(error))




      }








    }










  }



  validarTodo() {
    for (const key of Object.keys(this.productosForm.controls)) {
      if (this.productosForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.productosForm.controls[key].markAsTouched();
      }

    }
  }


  unProducto(idProducto: any) {


    this.productos.unRegistro(idProducto).subscribe(res => {

      this.listaProductosObj = res;
      this.ruta = "https://localhost:44396/" + this.listaProductosObj.imagen
      this.inputRuta = this.listaProductosObj.imagen;



      this.productosForm.patchValue(Object.assign({


        nombre: this.listaProductosObj.nombre,
        idProveedor: this.listaProductosObj.idProveedor,
        idCategoria: this.listaProductosObj.idCategoria,
        talla: this.listaProductosObj.talla,
        stock: this.listaProductosObj.stock,
        precioUnidad: this.listaProductosObj.precioUnidad,
        precioDocena: this.listaProductosObj.precioDocena,
        precioCompra: this.listaProductosObj.precioCompra,
        margenGanancia: this.listaProductosObj.margenGanancia,
        maxDescuento: this.listaProductosObj.maxDescuento,
        descripcion: this.listaProductosObj.descripcion,
        imagen: ""


      }));
      this.nombre = this.productosForm.get('nombre')?.value;



    }, error => {
      console.log(error);
    })
  }





}
