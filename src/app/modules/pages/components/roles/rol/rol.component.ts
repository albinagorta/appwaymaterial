import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { snackBarHelper } from '../../../helpers/snackbar.helper';
import { Roles } from '../../../models/roles.models';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  RolesForm: Roles = new Roles();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;
  validain_estado: boolean = false;
  titulo_vista:string = "Nuevo";
  public that:any = this;
  
constructor(
    public dialogo: MatDialogRef<RolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: RolesService,
    private snackbar: snackBarHelper,
    ){
    }

    ngOnInit() {
      this.Id = this.data.id;
      if (this.Id != 'nuevo') {
        this.titulo_vista = 'Actualizar';
        this.getDataDetailById();
      }
    }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }

    getDataDetailById() {
      this.http.getDataDetailById(this.Id).subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.RolesForm = resultData;
          }
        }
      },
        (error: any) => { 
          this.snackbar.error(error.message);
            setTimeout(() => {
              this.that.dialogo.close(false);
            }, 500);
        });
    }

    validarInStado() {
      this.validain_estado = true;
    }

    GuardarData(isValid: any) {
      if (this.Id != 'nuevo') {
        this.EditData(isValid);
      } else {
        this.AgregarData(isValid);
      }
    }
  
    AgregarData(isValid: any) {
      this.isSubmitted = true;
      if (isValid && this.validain_estado) {
        this.http.saveData(this.RolesForm)
          .subscribe(async data => {
            this.snackbar.success('Registro creado');
            setTimeout(() => {
              this.that.dialogo.close(true);
            }, 500);
          },
            async error => {
              this.snackbar.error(error.message);
              setTimeout(() => {
                this.that.dialogo.close(false);
              }, 500);
            });
      }
    }
  
  
    EditData(isValid: any) {
      this.validain_estado = true;
      this.isSubmitted = true;
      if (isValid) {
        this.http.UpdateData(this.Id, this.RolesForm).subscribe(async data => {
          if (data != null) {
            this.snackbar.success("Registro Actualizado");
            setTimeout(() => {
              this.that.dialogo.close(true);
            }, 500);
          }
        },
          async error => {
            this.snackbar.error(error.message);
            setTimeout(() => {
              this.that.dialogo.close(false);
            }, 500);
          });
      }
    }

}