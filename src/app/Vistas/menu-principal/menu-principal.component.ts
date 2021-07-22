import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  usuario: any = "";
  imagen: any = "";
  rol: any = "";
  idUsuario: number = 0;

  constructor(private router: Router, private permiso: NgxPermissionsService) {




    window.onbeforeunload = function() {
      localStorage.clear();
      return;
    };





    if (localStorage.getItem('rol')?.toLowerCase() == "administrador") {
  
   
      this.permiso.addPermission("administrador");
    


    }


    if (localStorage.getItem('rol')?.toLowerCase() == "empleado") {
  
    
      this.permiso.addPermission("empleado");
 

    }



    
    if (localStorage.getItem('rol')?.toLowerCase() == "bodeguero") {

      this.permiso.addPermission("bodeguero");

    }


   }

  ngOnInit(): void {
















    this.usuario = localStorage.getItem('nombres');
    this.imagen = localStorage.getItem('imagen');
    this.rol = localStorage.getItem('rol');
    this.idUsuario = parseFloat(JSON.parse(JSON.stringify(localStorage.getItem('idUsuario'))));






  }


  salir() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
