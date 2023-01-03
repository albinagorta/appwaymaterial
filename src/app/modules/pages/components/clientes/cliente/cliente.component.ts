import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';
import { Cliente } from 'src/app/modules/pages/models/cliente.models';
import { ClienteService } from 'src/app/modules/pages/services/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  ClienteForm: Cliente = new Cliente();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;
  titulo_vista:string = "Nueva";

  constructor(
            private snackbar: snackBarHelper, 
            private route: ActivatedRoute, 
            private router: Router,
            private http: ClienteService
            ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    if (this.Id != 'nuevo') {
      this.titulo_vista = 'Actualizar';
      this.getClienteDetailById();
    }
    
  }

  getClienteDetailById() {
    this.http.getClienteDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.ClienteForm = resultData;
        }
      }
    },
      (error: any) => {
        this.snackbar.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/dashboard/clientes']);
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

  AgregarData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.saveCliente( this.ClienteForm )
        .subscribe(async data => {
         this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/dashboard/clientes']);
          }, 500);
        },
        async error => {
         this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/clientes']);
          }, 500);
        });
    }
  }

  EditData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateCliente(this.Id,this.ClienteForm).subscribe(async data => {
        if (data!=null) {
          this.snackbar.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/dashboard/clientes']);
              }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/clientes']);
          }, 500);
        });
    }
  }

}

