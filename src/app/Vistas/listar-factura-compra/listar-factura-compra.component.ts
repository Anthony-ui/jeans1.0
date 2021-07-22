import Swal from 'sweetalert2';
import { FacturaCompraService } from './../../Servicios/factura-compra.service';
import { ToastrService } from 'ngx-toastr';
import { facturaCompra } from './../../Clases/facturaCompra';
import { DetalleFacturaCompraService } from './../../Servicios/detalle-factura-compra.service';
import { detalleFacturaCompra } from './../../Clases/detalleFacturaCompra';
import { Component, OnInit, ElementRef } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-listar-factura-compra',
  templateUrl: './listar-factura-compra.component.html',
  styleUrls: ['./listar-factura-compra.component.css']
})
export class ListarFacturaCompraComponent implements OnInit {

  objEncabezado: any[] = [];
  objDetalle: any[] = [];
  objConsulta:any;
  subtotal: number = 0;
  calculoIva: number = 0;
  valorIva: number = 0
  total: number = 0;
  acumulador: number = 0;
  IVA: number = 0;
  impIva: any = 0;
  precioTotal: number = 0;
  activo: any;
  identificador: any;

  constructor(
    private encabezadoFactura: DetalleFacturaCompraService,
    private toastr: ToastrService,
  


  ) {


  }

  ngOnInit(): void {

  }


  listarEncabezado() {


    this.objEncabezado = [];
    this.objDetalle = [];
    this.acumulador = 0;
    this.calculoIva = 0;
    this.impIva = 0;
    this.precioTotal = 0;
    this.activo = null;



    

    if (this.identificador == undefined) {

      this.toastr.warning("Ingrese numero de Factura");

      this.objEncabezado = [];
      this.objDetalle = [];
      this.acumulador = 0;
      this.calculoIva = 0;
      this.impIva = 0;
      this.precioTotal = 0;
      this.IVA = 0;
      this.IVA = 0;
      this.activo = null;

      return
    }

    this.encabezadoFactura.listarCabezera(this.identificador).subscribe((res: any) => {

     

      this.objEncabezado = res;

      if(this.objEncabezado.length == 0)
      {
        this.toastr.error("Esta factura no Existe");
        return;
      }





      if (this.objEncabezado.length != 0) {

        this.IVA = this.objEncabezado[0].iva;
        this.activo = this.objEncabezado[0].activo


      }






      if (this.objEncabezado.length == 0) {

        this.objEncabezado = [];
        this.objDetalle = [];
        this.acumulador = 0;
        this.calculoIva = 0;
        this.impIva = 0;
        this.precioTotal = 0;
        this.IVA = 0;
        this.activo = null;
        // this.toastr.warning("No se encuentra coincidencia");

        return

      }



      this.encabezadoFactura.listarDetalle(this.objEncabezado[0].idFacturaCompra).subscribe((res: any) => {


        this.objDetalle = res;

        this.calculos();





      }, error => console.log(error))







    }, error => console.log(error));
  }





  calculos() {


    this.objDetalle.forEach(item => {


      this.subtotal = parseFloat(item.cantidad) * parseFloat(item.precio) - item.descuento;
      this.acumulador = this.acumulador + this.subtotal
      this.impIva = ((this.acumulador * this.IVA) / 100).toFixed(2);
      this.precioTotal = (this.acumulador + parseFloat(this.impIva))


      //  descuento =descuento +parseFloat(item.descuento);


    });

    this.calculoIva = this.IVA





  }


  anular() {

  




    if(this.objEncabezado.length == 0)
    {
      this.toastr.error("Factura Inexistente");
      return
    }
      


      

       
    Swal.fire({
      title: '¿Seguro que desea anular la Factura?',
      text: "esta factura se anulará",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {


      



        this.encabezadoFactura.unRegistro(this.identificador).subscribe((res: facturaCompra) => {

        

          if(res.activo == false)
          {
            this.toastr.error("Esta Factura ya se ha anulado");
            return
          }


        
              

         
          res.activo = false;

          this.encabezadoFactura.editar(res.idFacturaCompra, res).subscribe(res => {
         

            this.objEncabezado = [];
            this.objDetalle = [];
            this.acumulador = 0;
            this.calculoIva = 0;
            this.impIva = 0;
            this.precioTotal = 0;
            this.IVA = 0;
            this.activo = null;


            this.encabezadoFactura.listarCabezera(this.identificador).subscribe((res: any) => {



              this.objEncabezado = res;
        
        
        
        
        
              if (this.objEncabezado.length != 0) {
        
                this.IVA = this.objEncabezado[0].iva;
                this.activo = this.objEncabezado[0].activo
        
        
              }
        
        
        
        
        
        
              if (this.objEncabezado.length == 0) {
        
                this.objEncabezado = [];
                this.objDetalle = [];
                this.acumulador = 0;
                this.calculoIva = 0;
                this.impIva = 0;
                this.precioTotal = 0;
                this.IVA = 0;
                this.activo = null;
                // this.toastr.warning("No se encuentra coincidencia");
        
                return
        
              }
        
        
        
              this.encabezadoFactura.listarDetalle(this.objEncabezado[0].idFacturaCompra).subscribe((res: any) => {
        
        
                this.objDetalle = res;
        
                this.calculos();
        
        
        
        
        
              }, error => console.log(error))
        
        
        
        
        
        
        
            }, error => console.log(error));
             

            

          }, error => console.log(error))


        }, error => console.log(error));



      }
    })






  }

  imprimir()
  {
    window.print();
  }

  borrar(evento:any)
  {
    
    let event=evento.target.value;
    if(event== "")
    {
  
      
      console.log(event);
      this.objEncabezado = [];
      this.objDetalle = [];
      this.acumulador = 0;
      this.calculoIva = 0;
      this.impIva = 0;
      this.precioTotal = 0;
      this.activo = null;
  

    }
   

  }


}
