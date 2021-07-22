import { ListarCiudadesComponent } from './Vistas/ciudades/listar-ciudades/listar-ciudades.component';
import { InsertarrolesComponent } from './Vistas/roles/insertar-roles/insertar-roles.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Vistas/login/login.component';
import { MenuPrincipalComponent } from './Vistas/menu-principal/menu-principal.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InsertarEmpleadosComponent } from './Vistas/empleados/insertar-empleados/insertar-empleados.component';
import { ListarEmpleadosComponent } from './Vistas/empleados/listar-empleados/listar-empleados.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { InsertarSucursalComponent } from './Vistas/sucursales/insertar-sucursal/insertar-sucursal.component';
import { ListarSucursalComponent } from './Vistas/sucursales/listar-sucursal/listar-sucursal.component';
import { InsertarClientesComponent } from './Vistas/clientes/insertar-clientes/insertar-clientes.component';
import { ListarClientesComponent } from './Vistas/clientes/listar-clientes/listar-clientes.component';
import { InsertarProveedoresComponent } from './Vistas/proveedores/insertar-proveedores/insertar-proveedores.component';
import { ListarProveedoresComponent } from './Vistas/proveedores/listar-proveedores/listar-proveedores.component';
import { ListarCategoriasComponent } from './Vistas/categoria/listar-categorias/listar-categorias.component';
import { InsertarCategoriasComponent } from './Vistas/categoria/insertar-categorias/insertar-categorias.component';
import { ListarRolesComponent } from './Vistas/roles/listar-roles/listar-roles.component';
import { InsertarProvinciasComponent } from './Vistas/provincias/insertar-provincias/insertar-provincias.component';
import { ListarProvinciasComponent } from './Vistas/provincias/listar-provincias/listar-provincias.component';
import { InsertarCiudadesComponent } from './Vistas/ciudades/insertar-ciudades/insertar-ciudades.component';
import { InsertarProductosComponent } from './Vistas/productos/insertar-productos/insertar-productos.component';
import { ListarProductosComponent } from './Vistas/productos/listar-productos/listar-productos.component';
import { InsertarConfiguracionesComponent } from './Vistas/configuraciones/insertar-configuraciones/insertar-configuraciones.component';
import { ListarConfiguracionesComponent } from './Vistas/configuraciones/listar-configuraciones/listar-configuraciones.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FacturaVentaComponent } from './Vistas/factura-venta/factura-venta.component';
import { FacturaCompraComponent } from './Vistas/factura-compra/factura-compra.component';
import { ListarFacturaCompraComponent } from './Vistas/listar-factura-compra/listar-factura-compra.component';
import { ListarFacturaVentaComponent } from './Vistas/listar-factura-venta/listar-factura-venta.component';
import { PerfilComponent } from './Vistas/perfil/perfil.component';
import { NgxPermissionsModule } from 'ngx-permissions';





@NgModule({
  declarations: [

    AppComponent, 
    LoginComponent,
    MenuPrincipalComponent,
    InsertarEmpleadosComponent,
    ListarEmpleadosComponent,
    FiltroPipe,
    InsertarSucursalComponent,
    ListarSucursalComponent,
    InsertarClientesComponent,
    ListarClientesComponent,
    InsertarProveedoresComponent,
    ListarProveedoresComponent,
    ListarCategoriasComponent,
    InsertarCategoriasComponent,
    InsertarrolesComponent,
    ListarRolesComponent,
    InsertarProvinciasComponent,
    ListarProvinciasComponent,
    InsertarCiudadesComponent,
    ListarCiudadesComponent,
    InsertarProductosComponent,
    ListarProductosComponent,
    InsertarConfiguracionesComponent,
    ListarConfiguracionesComponent,
    FacturaVentaComponent,
    FacturaCompraComponent,
    ListarFacturaCompraComponent,
    ListarFacturaVentaComponent,
    PerfilComponent,

  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    NgxPermissionsModule.forRoot()
    





    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
