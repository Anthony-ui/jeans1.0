import { detalleFacturaCompra } from './../../Clases/detalleFacturaCompra';
import { FacturaCompraService } from './../../Servicios/factura-compra.service';
import { facturaCompra } from './../../Clases/facturaCompra';
import { ProveedoresService } from './../../Servicios/proveedores.service';
import { Proveedor } from 'src/app/Clases/proveedor';
import  Swal  from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ConfiguracionService } from './../../Servicios/configuracion.service';
import { ClientesService } from './../../Servicios/clientes.service';
import { Producto } from 'src/app/Clases/producto';
import { Configuracion } from 'src/app/Clases/configuracion';
import { Cliente } from './../../Clases/cliente';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-factura-compra',
  templateUrl: './factura-compra.component.html',
  styleUrls: ['./factura-compra.component.css']
})
export class FacturaCompraComponent implements OnInit {

  numeroFactura: number = 0;
  proveedoresList: Proveedor[] = [];
  configuracionList: Configuracion[] = [];
  productosList: Producto[] = [];
  btnProveedor = "Seleccione un Proveedor";
  btnProducto = "Seleccione Producto";
  objProveedor: any;
  objConfiguracion: any;
  objProducto: any;
  fecha: number = Date.now();
  precio: number = 0;
  cantidad: number = 0;
  descuento: number = 0;
  maxDescuento: number = 0;
  totalDescuento: number = 0;
  detalleFactura = [];
  glbProducto: number = 0;
  objDetalle: any[] = [];
  valorDescuento: number = 0;
  idRepetido: any[] = []
  objNombre: any;
  subtotal: number = 0;
  precioCantidad: number = 0;
  comPararCantidad: any;
  calculoIva: number = 12;
  valorIva: number = 0;
  total: number = 0;
  idConfiguracion: number = 0;
  idProveedor: number = 0;
  dateFormat = require("dateformat");













  constructor(
    private cliente: ClientesService,
    private configuracion: ConfiguracionService,
    private config: NgSelectConfig,
    private producto: ProductosService,
    private elementRef: ElementRef,
    private facturaCompra: FacturaCompraService,
    private toastr: ToastrService,
    private proveedores:ProveedoresService,
    private renderer: Renderer2




  ) {
    this.config.notFoundText = 'No existen coincidencias';
    this.config.clearAllText='eliminar';

  }

  ngOnInit(): void {

    this.listarProveedor();
    this.listarConfiguracion();
    this.listarProducto();
    this.cargarNumero();




  }




  listarProveedor() {
    this.proveedores.listar(localStorage.getItem('sucursal')).subscribe(res => {

      this.proveedoresList = res;

    }, error => console.log(error))
  }





  listarConfiguracion() {
    this.configuracion.listar().subscribe(res => {

      this.configuracionList = res;

    }, error => console.log(error))
  }


  cargarNumero() {

    this.facturaCompra.numeroFactura().subscribe(res => {

      this.numeroFactura = JSON.parse(JSON.stringify(res)) + 1;

    }, error => console.log(error))

  }



  listarProducto() {
    this.producto.listar(localStorage.getItem('sucursal')).subscribe(res => {

      this.productosList = res;

    }, error => console.log(error))
  }





  cargarProveedor(event: number) {




    if (event == null) {
      return
    }

    this.idProveedor = event;

    this.unProveedor(event);


  }





  cargarProducto(event: number) {

    this.glbProducto = event;


    this.unProducto(event);

  }







  unProveedor(id: number) {
    this.proveedores.unRegistro(id).subscribe((res) => {


      this.objProveedor = res;

    }, error => console.log(error))
  }






  unProducto(id: number) {

    if (id == null) {
      return
    }

    this.producto.unRegistro(id).subscribe((res) => {

      this.objProducto = res;
      this.precio = parseFloat(this.objProducto.precioCompra);
      this.totalDescuento = parseFloat(this.objProducto.precioCompra);
      this.maxDescuento = parseFloat(this.objProducto.maxDescuento);

    }, error => console.log(error))

  }






  calcularDescuento(valDescuento: number) {


     if(valDescuento > 100)
     {

       this.toastr.warning("El descuento no debe ser mayor a 100% ");
       this.elementRef.nativeElement.querySelector('#descuento').value = 0;

       let des = (this.descuento * this.precio) / 100;
       this.valorDescuento = des;
       this.elementRef.nativeElement.querySelector('#totalDescuento').value = (this.precio - des).toFixed(2);
       return

     }






    let des = (valDescuento * this.precio) / 100;
    this.valorDescuento = des;
    this.elementRef.nativeElement.querySelector('#totalDescuento').value = (this.precio - des).toFixed(2);





  }

  quitar(producto: any) {
    this.objDetalle.splice(this.objDetalle.indexOf(producto), 1);
    this.calculos();
  }




  agregarProducto() {



    if(this.btnProducto==null)
    {

      this.toastr.warning('Seleccione un Producto ');

      this.elementRef.nativeElement.querySelector('#cantidad').value=0;
      this.elementRef.nativeElement.querySelector('#precio').value=0
      this.elementRef.nativeElement.querySelector('#descuento').value=0
      this.elementRef.nativeElement.querySelector('#totalDescuento').value=0

      return

    }





    if (this.btnProveedor == 'Seleccione un Proveedor') {

      this.toastr.warning('Seleccione un Proveedor');
      return
    }


    if(this.btnProveedor==null)
    {
      this.toastr.warning('Seleccione un Proveedor');
      return

    }




    if (this.glbProducto == 0) {

      this.toastr.warning('Debe seleccionar un producto');
      return;
    }

    this.producto.unRegistro(this.glbProducto).subscribe(res => {



      this.objNombre = res;


      var cantidad = this.elementRef.nativeElement.querySelector('#cantidad').value;
      var precio = this.elementRef.nativeElement.querySelector('#precio').value;


      if (this.glbProducto == null) {
        this.toastr.warning('Seleccione un Producto');
        return
      }


      if (cantidad == 0 || cantidad == "" || cantidad == null) {

        this.toastr.warning('Ingrese una cantidad mayor a 1');
        return
      }


      if (this.objDetalle.find(x => x.idProducto == this.glbProducto)) {

        this.toastr.warning('Este producto ya esta registrado en la factura');
        return
      }


      this.precioCantidad = parseFloat(cantidad) * parseFloat(precio);









      const objProducto =

      {

        producto: this.objNombre.nombre,
        talla:this.objNombre.talla,
        idProducto: this.glbProducto,
        cantidad: cantidad,
        precio: precio,
        descuento: this.valorDescuento.toFixed(2),
        subtotal: this.precioCantidad.toFixed(2),
        idfacturaCompra: '5'


      };


      this.objDetalle.push(objProducto);
      this.idRepetido.push(this.glbProducto);



      this.calculos();

















      this.elementRef.nativeElement.querySelector('#cantidad').value = "";
      this.elementRef.nativeElement.querySelector('#precio').value = 0;
      this.elementRef.nativeElement.querySelector('#descuento').value = 0;
      this.elementRef.nativeElement.querySelector('#totalDescuento').value = 0;
      this.btnProducto='Seleccione Producto';




    }, error => console.log(error))









  }





  calculos() {

    var subtotal: number = 0;
    var descuento:number=0;
    this.objDetalle.forEach(item => {
      subtotal = subtotal + parseFloat(item.subtotal);
      descuento =descuento +parseFloat(item.descuento);
    });

    this.subtotal = subtotal - descuento;


    this.valorIva = Math.round(((this.subtotal * this.calculoIva) / 100) * 100) / 100;
    this.total = Math.round((this.subtotal + this.valorIva) * 100) / 100;


  }



  precioDocena(evento: any) {




    if (evento == null) {
      return;
    }


    if (this.glbProducto == 0) {
      return
    }


    this.producto.unRegistro(this.glbProducto).subscribe((res: Producto) => {



      if (evento < 0) {
        this.toastr.warning('La cantidad no puede ser un numero negativo');
        this.elementRef.nativeElement.querySelector('#cantidad').value = 0;
        return
      }


      if (evento >= 12) {
        this.precio = res.precioDocena;
        this.elementRef.nativeElement.querySelector('#precio').value = res.precioDocena;
        this.elementRef.nativeElement.querySelector('#totalDescuento').value = res.precioDocena;
        return
      }




      if (evento < 12) {

        this.elementRef.nativeElement.querySelector('#precio').value = res.precioCompra;
        return

      }


    }, error => console.log(error))


  }






  ultimaFactura() {
    this.facturaCompra.ultimaFactura(this.idProveedor, localStorage.getItem('sucursal')).subscribe(res => {

      this.objDetalle.forEach(item => {

        var facturaCompra: detalleFacturaCompra={
          idDetalleFacturaCompra: 0,
          idProducto: item.idProducto,
          cantidad: item.cantidad,
          precio: item.precio,
          descuento: item.descuento,
          idFacturaCompra:JSON.parse(JSON.stringify(res)),


        }




        this.producto.unRegistro(item.idProducto).subscribe((res): any => {


          res.stock =  res.stock  + parseInt (item.cantidad);

          this.producto.editar(item.idProducto, res).subscribe(res => {

          })

        }, error => console.log(error))





        this.facturaCompra.guardarDetalle(facturaCompra).subscribe(res => {
          Swal.fire('Facturacion', 'Factura Generada Correctamente', 'success');

          setTimeout(() => {
            location.reload();
          }, 1500);

        }, error => {

          console.log(error);

      

        })

      });



    }, error => console.log(error))
  }





  guardarDatos() {



    if (this.btnProveedor == 'Seleccione un Proveedor') {

      this.toastr.warning('Seleccione un Proveedor');
      return
    }


    if(this.btnProveedor==null)
    {
      this.toastr.warning('Seleccione un Proveedor');
      return

    }




    if (this.objDetalle.length == 0) {
      this.toastr.warning('Agruegue productos para realizar la Facturacion');
      return
    }





    let sucursal = JSON.parse(JSON.stringify(localStorage.getItem('sucursal')));

    var facturaCompra: facturaCompra = {

      idFacturaCompra: 0,
      fecha:  this.dateFormat(this.fecha, "yyyy-mm-dd"),
      iva: this.calculoIva,
      idProveedor: this.idProveedor,
      idSucursal: sucursal,
      activo: true,
      idUsuario:JSON.parse(JSON.stringify(localStorage.getItem('idUsuario')))

    }




    this.facturaCompra.guardarEncabezado(facturaCompra).subscribe(res => {

      this.ultimaFactura();





    }, error => console.log(error))






  }



  comprobarIva(evento:any)
  {

    if(evento>100)
    {
      this.toastr.warning('La cantidad no puede ser mayor a 100 %');
      this.elementRef.nativeElement.querySelector('#calculoIva').value = 12;


      return


    }

  }






}
