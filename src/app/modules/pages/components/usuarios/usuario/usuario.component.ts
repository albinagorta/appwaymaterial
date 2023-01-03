import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';
import { Usuario } from 'src/app/modules/pages/models/usuario.models';
import { UsuariosService } from 'src/app/modules/pages/services/usuarios.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  UsuarioForm: Usuario = new Usuario();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;
  validain_estado:boolean = false;
  titulo_vista:string = "Nuevo";

  constructor(
            private snackbar: snackBarHelper, 
            private route: ActivatedRoute, 
            private router: Router,
            private http: UsuariosService
            ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    if (this.Id != 'nuevo') {
      this.titulo_vista = 'Actualizar';
      this.getClienteDetailById();
    }
    
  }

  getClienteDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.UsuarioForm= resultData;
        }
      }
    },
      (error: any) => { 
        this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/usuarios']);
          }, 500);
      });
  }


  GuardarData(isValid: any) {
    if (this.Id != 'nuevo') {
      this.EditData(isValid);
    } else {
      this.AgregarData(isValid);
    }
  }

  EditData(isValid: any) {
    this.validain_estado = true;
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateData(this.Id,this.UsuarioForm).subscribe(async data => {
        if (data!=null) {
          this.snackbar.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/dashboard/usuarios']);
              }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/usuarios']);
          }, 500);
        });
    }
  }

  AgregarData(isValid: any) {
    this.isSubmitted = true;
    if (isValid && this.validain_estado) {
      this.http.saveData( this.UsuarioForm )
        .subscribe(async data => {
          this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/dashboard/usuarios']);
          }, 500);
        },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/usuarios']);
          }, 500);
        });
    }
  }

  validarInStado(){
    this.validain_estado = true;
  }

}

