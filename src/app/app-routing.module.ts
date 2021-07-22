import { LoginGuard } from './Guards/login.guard';
import { PerfilComponent } from './Vistas/perfil/perfil.component';
import { ListarFacturaVentaComponent } from './Vistas/listar-factura-venta/listar-factura-venta.component';
import { ListarFacturaCompraComponent } from './Vistas/listar-factura-compra/listar-factura-compra.component';
import { FacturaVentaComponent } from './Vistas/factura-venta/factura-venta.component';
import { ListarConfiguracionesComponent } from './Vistas/configuraciones/listar-configuraciones/listar-configuraciones.component';
import { InsertarConfiguracionesComponent } from './Vistas/configuraciones/insertar-configuraciones/insertar-configuraciones.component';
import { ListarProductosComponent } from './Vistas/productos/listar-productos/listar-productos.component';
import { InsertarProductosComponent } from './Vistas/productos/insertar-productos/insertar-productos.component';
import { ListarCiudadesComponent } from './Vistas/ciudades/listar-ciudades/listar-ciudades.component';
import { ListarProvinciasComponent } from './Vistas/provincias/listar-provincias/listar-provincias.component';
import { InsertarProvinciasComponent } from './Vistas/provincias/insertar-provincias/insertar-provincias.component';
import { InsertarCiudadesComponent } from './Vistas/ciudades/insertar-ciudades/insertar-ciudades.component';
import { InsertarrolesComponent } from './Vistas/roles/insertar-roles/insertar-roles.component';
import { ListarRolesComponent } from './Vistas/roles/listar-roles/listar-roles.component';
import { ListarCategoriasComponent } from './Vistas/categoria/listar-categorias/listar-categorias.component';
import { InsertarCategoriasComponent } from './Vistas/categoria/insertar-categorias/insertar-categorias.component';
import { ListarProveedoresComponent } from './Vistas/proveedores/listar-proveedores/listar-proveedores.component';
import { InsertarProveedoresComponent } from './Vistas/proveedores/insertar-proveedores/insertar-proveedores.component';
import { InsertarClientesComponent } from './Vistas/clientes/insertar-clientes/insertar-clientes.component';
import { InsertarSucursalComponent } from './Vistas/sucursales/insertar-sucursal/insertar-sucursal.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertarEmpleadosComponent } from './Vistas/empleados/insertar-empleados/insertar-empleados.component';
import { ListarEmpleadosComponent } from './Vistas/empleados/listar-empleados/listar-empleados.component';
import { LoginComponent } from './Vistas/login/login.component';
import { MenuPrincipalComponent } from './Vistas/menu-principal/menu-principal.component';
import { ListarSucursalComponent } from './Vistas/sucursales/listar-sucursal/listar-sucursal.component';
import { ListarClientesComponent } from './Vistas/clientes/listar-clientes/listar-clientes.component';
import { FacturaCompraComponent } from './Vistas/factura-compra/factura-compra.component';
import {NgxPermissionsGuard} from 'ngx-permissions';


const routes: Routes = [

  {path:'login' ,component:LoginComponent},
  
 

  {path:'menuPrincipal',
   component:MenuPrincipalComponent,
   canActivate:[LoginGuard],
   children:[
    {path:'insertarEmpleados', component:InsertarEmpleadosComponent 
    
    
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }


  },
    {path:'listarEmpleados', component:ListarEmpleadosComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  },
    {path:'editarEmpleados/:id', component:InsertarEmpleadosComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },

    {path:'insertarSucursales', component:InsertarSucursalComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'listarSucursales', component:ListarSucursalComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    {path:'editarSucursales/:id', component:InsertarSucursalComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    
    {path:'insertarClientes', component:InsertarClientesComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'listarClientes', component:ListarClientesComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    {path:'editarClientes/:id', component:InsertarClientesComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },

    {path:'insertarProveedores', component:InsertarProveedoresComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'listarProveedores', component:ListarProveedoresComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'editarProveedores/:id', component:InsertarProveedoresComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },

    {path:'insertarCategorias', component:InsertarCategoriasComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero'],

        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  
  },
    {path:'listarCategorias', component:ListarCategoriasComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'editarCategorias/:id', component:InsertarCategoriasComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },

    {path:'insertarRoles', component:InsertarrolesComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    {path:'listarRoles', component:ListarRolesComponent,
  
   
    canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['empleado','administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }



  
  
  },
    {path:'editarRoles/:id', component:InsertarrolesComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },

    {path:'insertarCiudades', component:InsertarCiudadesComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
  
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'listarCiudades', component:ListarCiudadesComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
  
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    {path:'editarCiudades/:id', component:InsertarCiudadesComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },

    {path:'insertarProvincias', component:InsertarProvinciasComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'listarProvincias', component:ListarProvinciasComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'editarProvincias/:id', component:InsertarProvinciasComponent
  
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },

    
    {path:'insertarProductos', component:InsertarProductosComponent
     ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero'],
  
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    {path:'listarProductos', component:ListarProductosComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero'],
     
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'editarProductos/:id', component:InsertarProductosComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero'],

        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  
  },

    {path:'insertarConfiguraciones', component:InsertarConfiguracionesComponent
      
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  },
    {path:'listarConfiguraciones', component:ListarConfiguracionesComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },
    {path:'editarConfiguraciones/:id', component:InsertarConfiguracionesComponent

    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  
  },

    {path:'facturaVenta', component:FacturaVentaComponent
  
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  
  },
    {path:'facturaCompra', component:FacturaCompraComponent
    ,canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['administrador','bodeguero','empleado'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }
  
  },

    {path:'listaFacturaCompra', component:ListarFacturaCompraComponent, 
    
    canActivate: [NgxPermissionsGuard],

    data: {

      permissions: {
 
        only: ['empleado','administrador','bodeguero'],
        redirectTo:'/menuPrincipal'
        
      }
      
    }},


    {path:'listaFacturaVenta', component:ListarFacturaVentaComponent, canActivate: [NgxPermissionsGuard],

       data: {

      permissions: {
 
        only: ['empleado','administrador','bodeguero'],
   
        redirectTo:'/menuPrincipal'
      }
    }
  },

    {path:'perfil/:id', component:PerfilComponent}
    
  
    
    
    

   ]
},



  {path:'‘’' ,component:LoginComponent},
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'**',pathMatch:'full',redirectTo:'login'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
