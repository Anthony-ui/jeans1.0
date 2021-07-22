import Swal from 'sweetalert2';
import { facturaVenta } from './../../Clases/facturaVenta';
import { detalleFacturaVenta } from './../../Clases/detalleFacturaVenta';
import { ProductosService } from './../../Servicios/productos.service';
import { FacturaVentaService } from './../../Servicios/factura-venta.service';
import { ConfiguracionService } from './../../Servicios/configuracion.service';
import { Configuracion } from './../../Clases/configuracion';
import { Cliente } from './../../Clases/cliente';
import { ClientesService } from './../../Servicios/clientes.service';
import { Component, OnInit, Pipe, ElementRef, ɵConsole } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Producto } from 'src/app/Clases/producto';
import { ToastrService } from 'ngx-toastr';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-factura-venta',
  templateUrl: './factura-venta.component.html',
  styleUrls: ['./factura-venta.component.css'],
})
export class FacturaVentaComponent implements OnInit {
  numeroFactura: number = 0;
  clientesList: Cliente[] = [];
  configuracionList: Configuracion[] = [];
  configuracionActivo: Configuracion[] = [];
  productosList: Producto[] = [];
  btnCliente = 'Seleccione Cliente';
  btnConfiguracion = 'Seleccione Configuracion';
  btnProducto = 'Seleccione Producto';
  objCliente: any;
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
  idRepetido: any[] = [];
  objNombre: any;
  subtotal: number = 0;
  precioCantidad: number = 0;
  comPararCantidad: any;
  calculoIva: number = 12;
  valorIva: number = 0;
  total: number = 0;
  idConfiguracion: number = 0;
  idCliente: number = 0;
  dateFormat = require('dateformat');

  constructor(
    private cliente: ClientesService,
    private configuracion: ConfiguracionService,
    private config: NgSelectConfig,
    private producto: ProductosService,
    private elementRef: ElementRef,
    private facturaVenta: FacturaVentaService,
    private toastr: ToastrService
  ) {
    this.config.notFoundText = 'No existen coincidencias';
    this.config.clearAllText = 'eliminar';
  }

  ngOnInit(): void {
    this.listarCliente();
    this.listarConfiguracion();
    this.listarProducto();
    this.cargarNumero();
    this.listarActivo();
  }

  listarCliente() {
    this.cliente.listar(localStorage.getItem('sucursal')).subscribe(
      (res) => {
        this.clientesList = res;
      },
      (error) => console.log(error)
    );
  }

  listarConfiguracion() {
    this.configuracion.listar().subscribe(
      (res) => {
        this.configuracionList = res;
      },
      (error) => console.log(error)
    );
  }

  listarActivo() {
    this.configuracion.listarActivo().subscribe(
      (res) => {
        this.configuracionActivo = res;
      },
      (error) => console.log(error)
    );
  }

  cargarNumero() {
    this.facturaVenta.numeroFactura().subscribe(
      (res) => {
        this.numeroFactura = JSON.parse(JSON.stringify(res)) + 1;
      },
      (error) => console.log(error)
    );
  }

  listarProducto() {
    this.producto.listar(localStorage.getItem('sucursal')).subscribe(
      (res) => {
        this.productosList = res;
      },
      (error) => console.log(error)
    );
  }

  cargarCliente(event: number) {
    if (event == null) {
      return;
    }

    this.idCliente = event;

    this.unCliente(event);
  }

  cargarConfiguracion(event: number) {
    if (event == null) {
      return;
    }

    this.idConfiguracion = event;

    this.unConfiguracion(event);
  }

  cargarProducto(event: number) {
    this.glbProducto = event;

    this.unProducto(event);
  }

  unCliente(id: number) {
    this.cliente.unRegistro(id).subscribe(
      (res) => {
        this.objCliente = res;
      },
      (error) => console.log(error)
    );
  }

  unConfiguracion(id: number) {
    this.configuracion.unRegistro(id).subscribe(
      (res) => {
        this.objConfiguracion = res;
      },
      (error) => console.log(error)
    );
  }

  unProducto(id: number) {
    if (id == null) {
      return;
    }

    this.producto.unRegistro(id).subscribe(
      (res) => {
        this.objProducto = res;
        this.precio = parseFloat(this.objProducto.precioUnidad);
        this.totalDescuento = parseFloat(this.objProducto.precioUnidad);
        this.maxDescuento = parseFloat(this.objProducto.maxDescuento);
      },
      (error) => console.log(error)
    );
  }

  calcularDescuento(valDescuento: number) {
    let des = (valDescuento * this.precio) / 100;
    this.valorDescuento = des;
    this.elementRef.nativeElement.querySelector('#totalDescuento').value = (
      this.precio - des
    ).toFixed(2);

    if (valDescuento > this.maxDescuento) {
      this.toastr.warning('Descuento maximo es de ' + this.maxDescuento + '%');

      this.elementRef.nativeElement.querySelector(
        '#descuento'
      ).value = this.maxDescuento;

      let des = (this.maxDescuento * this.precio) / 100;

      this.valorDescuento = des;

      this.elementRef.nativeElement.querySelector('#totalDescuento').value = (
        this.precio - des
      ).toFixed(2);
    }
  }

  quitar(producto: any) {
    this.objDetalle.splice(this.objDetalle.indexOf(producto), 1);
    this.calculos();
  }

  agregarProducto() {
    if (this.btnProducto == null) {
      this.toastr.warning('Seleccione un Producto ');

      this.elementRef.nativeElement.querySelector('#cantidad').value = 0;
      this.elementRef.nativeElement.querySelector('#precio').value = 0;
      this.elementRef.nativeElement.querySelector('#descuento').value = 0;
      this.elementRef.nativeElement.querySelector('#totalDescuento').value = 0;

      return;
    }

    if (this.btnConfiguracion == 'Seleccione Configuracion') {
      this.toastr.warning('Seleccione una Configuracion');
      return;
    }

    if (this.btnConfiguracion == null) {
      this.toastr.warning('Seleccione una Configuracion');
      return;
    }

    if (this.btnCliente == 'Seleccione Cliente') {
      this.toastr.warning('Seleccione un Cliente');
      return;
    }

    if (this.btnCliente == null) {
      this.toastr.warning('Seleccione un Cliente');
      return;
    }

    if (this.glbProducto == 0) {
      this.toastr.warning('Debe seleccionar un producto');
      return;
    }

    this.producto.unRegistro(this.glbProducto).subscribe(
      (res) => {
        this.objNombre = res;

        var cantidad = this.elementRef.nativeElement.querySelector('#cantidad')
          .value;
        var precio = this.elementRef.nativeElement.querySelector('#precio')
          .value;

        if (this.glbProducto == null) {
          this.toastr.warning('Seleccione un Producto');
          return;
        }

        if (cantidad == 0 || cantidad == '' || cantidad == null) {
          this.toastr.warning('Ingrese una cantidad mayor a 1');
          return;
        }

        if (this.objDetalle.find((x) => x.idProducto == this.glbProducto)) {
          this.toastr.warning('Este producto ya esta registrado en la factura');
          return;
        }

        this.precioCantidad = parseFloat(cantidad) * parseFloat(precio);

        const objProducto = {
          producto: this.objNombre.nombre,
          talla: this.objNombre.talla,
          idProducto: this.glbProducto,
          cantidad: cantidad,
          precio: precio,
          descuento: this.valorDescuento.toFixed(2),
          subtotal: this.precioCantidad.toFixed(2),
          idFacturaVenta: '5',
        };

        this.objDetalle.push(objProducto);
        this.idRepetido.push(this.glbProducto);

        this.calculos();

        this.elementRef.nativeElement.querySelector('#cantidad').value = '';
        this.elementRef.nativeElement.querySelector('#precio').value = 0;
        this.elementRef.nativeElement.querySelector('#descuento').value = 0;
        this.elementRef.nativeElement.querySelector(
          '#totalDescuento'
        ).value = 0;
        this.btnProducto = 'Seleccione Producto';
      },
      (error) => console.log(error)
    );
  }

  calculos() {
    var subtotal: number = 0;
    var descuento: number = 0;
    this.objDetalle.forEach((item) => {
      subtotal = subtotal + parseFloat(item.subtotal);
      descuento = descuento + parseFloat(item.descuento);
    });

    this.subtotal = subtotal - descuento;

    this.valorIva =
      Math.round(((this.subtotal * this.calculoIva) / 100) * 100) / 100;
    this.total = Math.round((this.subtotal + this.valorIva) * 100) / 100;
  }

  precioDocena(evento: any) {
   

    if (this.glbProducto == 0) {
      return;
    }

    if (evento == null) {
      return;
    }

    this.producto.unRegistro(this.glbProducto).subscribe( (res: Producto) => {
    
        if (evento < 0) {
          this.toastr.warning('La cantidad no puede ser un numero negativo');
          this.elementRef.nativeElement.querySelector('#cantidad').value = 0;
          return;
        }

        if (evento >= 12) {
          this.precio = res.precioDocena;
          this.elementRef.nativeElement.querySelector('#precio').value =
            res.precioDocena;
          this.elementRef.nativeElement.querySelector('#totalDescuento').value =
            res.precioDocena;
          return;
        }

        if (evento < 12) {
          this.elementRef.nativeElement.querySelector('#precio').value =
            res.precioUnidad;
          return;
        }
      },
      (error) => console.log(error)
    );
  }

  ultimaFactura() {
    this.facturaVenta
      .ultimaFactura(this.idCliente, localStorage.getItem('sucursal'))
      .subscribe(
        (res) => {
          this.objDetalle.forEach((item) => {
            var facturaVenta: detalleFacturaVenta = {
              idDetalleFacturaVenta: 0,
              idProducto: item.idProducto,
              cantidad: item.cantidad,
              precio: item.precio,
              descuento: item.descuento,
              idFacturaVenta: JSON.parse(JSON.stringify(res)),
            };

            this.producto.unRegistro(item.idProducto).subscribe(
              (res): any => {
                res.stock = res.stock - item.cantidad;

                this.producto
                  .editar(item.idProducto, res)
                  .subscribe((res) => {});
              },
              (error) => console.log(error)
            );

            this.facturaVenta.guardarDetalle(facturaVenta).subscribe(
              (res) => {

                
                
                Swal.fire('Facturacion','Factura Generada Correctamente','success' )
             
                setTimeout(() => {
                  location.reload();
                }, 1500);

             
              },
              (error) => {
                console.log(error);
              }
            );
          });
        },
        (error) => console.log(error)
      );
  }

  guardarDatos() {
    if (this.btnConfiguracion == 'Seleccione Configuracion') {
      this.toastr.warning('Seleccione una Configuracion');
      return;
    }

    if (this.btnConfiguracion == null) {
      this.toastr.warning('Seleccione una Configuracion');
      return;
    }

    if (this.btnCliente == 'Seleccione Cliente') {
      this.toastr.warning('Seleccione un Cliente');
      return;
    }

    if (this.btnCliente == null) {
      this.toastr.warning('Seleccione un Cliente');
      return;
    }

    if (this.objDetalle.length == 0) {
      this.toastr.warning('Agruegue productos para realizar la Facturacion');
      return;
    }

    let sucursal = JSON.parse(JSON.stringify(localStorage.getItem('sucursal')));

    var facturaVenta: facturaVenta = {
      idFacturaVenta: 0,
      fecha: this.dateFormat(this.fecha, 'yyyy-mm-dd'),
      iva: this.calculoIva,
      idCliente: this.idCliente,
      idConfiguracion: this.idConfiguracion,
      idSucursal: sucursal,
      activo: true,
      idUsuario: JSON.parse(JSON.stringify(localStorage.getItem('idUsuario'))),
    };

    this.facturaVenta.guardarEncabezado(facturaVenta).subscribe(
      (res) => {
        
        this.ultimaFactura();
      },
      (error) => console.log(error)
    );
  }

  comprobarStock(evento: any) {
 
   
    if(this.glbProducto == 0)
    {
      return;
    }
     
    let even = evento.target.value;
    

    this.producto.unRegistro(this.glbProducto).subscribe((res: any) => {
        if (res.stock - even < 0) {
          this.toastr.error(
            'Solo quedan' + ' ' + res.stock + ' ' + 'Unidades Disponible'
          );
          this.elementRef.nativeElement.querySelector('#cantidad').value = 0;
          return;
        }
      },
      (error) => console.log(error)
    );
  }
}
