import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/global/snackbar';
// import { ToastrService } from 'ngx-toastr';

import { Cliente } from 'src/app/modules/models/cliente.models';
import { ClienteService } from 'src/app/modules/service/cliente.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addDataForm: Cliente =  new Cliente();

  @ViewChild("clienteForm")
  clienteForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, 
              private http: ClienteService, 
              private snackbar: snackBar
              ) { }

  ngOnInit(): void {
  }

  AgregarData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.saveCliente( this.addDataForm )
        .subscribe(async data => {
         this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 500);
        },
        async error => {
         this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 500);
        });
    }
  }

}

