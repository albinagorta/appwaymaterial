import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { snackBar } from 'src/app/global/snackbar';

import { Categoria } from '../../../models/categoria.models';

import { CategoriasService } from '../../../service/categorias.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addDataForm: Categoria =  new Categoria();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  validain_estado:boolean = false;
  constructor(private router: Router, 
              private http: CategoriasService, 
              private snackbar: snackBar
              ){ }

  ngOnInit(): void {
  }

  AgregarData(isValid: any) {
    this.isSubmitted = true;
    if (isValid && this.validain_estado) {     
      this.http.saveData( this.addDataForm )
        .subscribe(async data => {
          this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/categorias']);
          }, 500);
        },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/categorias']);
          }, 500);
        });
    }
  }


  validarInStado(){
    this.validain_estado = true;
  }
  
}

