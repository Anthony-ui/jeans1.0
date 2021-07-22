import { SelectLoginService } from './../../Servicios/select-login.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sucursalesList: any = [];
  sesion: any = [];
  bool: number = 0;

  loginForm = new FormGroup({
    sucursales: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required)
  });


  constructor(private sucursales: SelectLoginService, private router: Router, private el: ElementRef) {

    if (localStorage != undefined) {

      localStorage.clear();



    }

  }

  ngOnInit(): void {
    this.listar();

  }



  async listar() {

    await this.sucursales.listarSucursales().subscribe(res => {
      this.sucursalesList = res
    },error=>{
      this.bool=0;
      alert("Error al Conectar con el servidor Intentelo");
    })

  }




  destruir() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("usuario");
  }

  inicioSesion(objeto: any = "") {
    
    

    if (this.loginForm.invalid) {
      this.validarTodo();
      this.bool = 0;
      
      return;
    }

    this.sucursales.login(objeto).subscribe(res => {

      this.bool = 1;
     


     


      if (res.length == 0) {
        Swal.fire("Login", "Credenciales Incorrectas", "error");
        this.bool=0;
      }
      else {


        this.sesion = res;
        localStorage.setItem('idUsuario', this.sesion.idUsuario);
        localStorage.setItem('rol', this.sesion.rol.nombre);
        localStorage.setItem('sucursal', this.loginForm.get('sucursales')?.value);
        localStorage.setItem('imagen', this.sesion.imagen);
        localStorage.setItem('nombres', this.sesion.nombre + " " + this.sesion.apellido);

        this.router.navigate(['/menuPrincipal']);


      }
      
 
    }, error => {
      alert(error);
      this.bool=0;
    });

    this.bool=0;


  }


  //Validar si todos los campos estan llenos  

  validarTodo() {
    for (const key of Object.keys(this.loginForm.controls)) {
      if (this.loginForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.loginForm.controls[key].markAsTouched();
      }
    }
  }



}
