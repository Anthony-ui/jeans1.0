import { error } from 'protractor';
import { RolesService } from 'src/app/Servicios/roles.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Rol } from './../../../Clases/rol';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-roles',
  templateUrl: './insertar-roles.component.html',
  styleUrls: ['./insertar-roles.component.css'],
})
export class InsertarrolesComponent implements OnInit {
  idRol: any;
  rolesList: Rol[] = [];
  rolRepetido = '';

  rolForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private el: ElementRef,
    private roles: RolesService,
    private rutaActiva: ActivatedRoute
  ) {
    this.idRol = this.rutaActiva.snapshot.params.id;

    if (this.idRol != undefined) {
      this.unRol(this.idRol);
    }
  }

  ngOnInit(): void {
    this.listarSucursal();
  }

  guardar(rolObj: Rol) {
    if (this.rolForm.invalid) {
      this.validarTodo();
      Swal.fire('Roles', 'Todos los campos son requeridos', 'warning');
      return;
    }

    if (this.idRol == undefined) {
      this.roles.repetido(this.rolForm.get('nombre')?.value).subscribe(
        (res) => {
          if (res == true) {
            Swal.fire('roles', 'Esta rol ya existe', 'warning');
          } else {
            this.roles.guardarDatos(rolObj).subscribe(
              (res) => {
                this.toastr.success('Registro exitoso');
                this.router.navigate(['menuPrincipal/listarRoles']);
              },
              (error) => {
                this.toastr.error('Error al guardar');
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
        //proceso de editar
      if(this.rolRepetido == rolObj.nombre)
      {
        
      this.editar(this.idRol, rolObj);

      }else
      {
        
        this.roles.repetido(this.rolForm.get('nombre')?.value).subscribe(res=>
          {
            if(res==true)
            {
              Swal.fire('roles', 'Esta rol ya existe', 'warning');
            }else
            {
              this.editar(this.idRol, rolObj);
            }

          },error=>console.log(error))

      }
    

    }
  }

  editar(idRol: any, sucursaObj: any) {
    sucursaObj.idRol = this.idRol;
    this.roles.editar(idRol, sucursaObj).subscribe(
      (res) => {
        this.toastr.success('Editado Correctamente');
        this.router.navigate(['menuPrincipal/listarRoles']);
      },
      (error) => {
        this.toastr.error('Error al editar');
      }
    );
  }

  navegar() {
    this.router.navigate(['menuPrincipal/listarRoles']);
  }

  // listarCiudad() {

  //   this.ciudades.listar().subscribe(res => {

  //     this.ciudadList = res;

  //   });

  // }

  unRol(id: any) {
    this.roles.unRegistro(id).subscribe((res) => {
      //primero se llena el combo y luego se asigna el objeto
      // this.listarCiudad();
      this.rolForm.patchValue(Object.assign({}, res));
      this.rolRepetido = this.rolForm.get('nombre')?.value;
    });
  }

  validarTodo() {
    for (const key of Object.keys(this.rolForm.controls)) {
      if (this.rolForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );
        invalidControl.focus();
        this.rolForm.controls[key].markAsTouched();
      }
    }
  }

  listarSucursal() {
    this.roles.listar().subscribe(
      (res) => {
        this.rolesList = res;
      },
      (error) => console.log(error)
    );
  }
}
