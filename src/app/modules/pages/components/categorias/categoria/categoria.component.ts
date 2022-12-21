import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBar } from 'src/app/modules/pages/helpers/snackbar';

import { Categoria } from 'src/app/modules/pages/models/categoria.models';
import { CategoriasService } from 'src/app/modules/pages/services/categorias.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  CategoriaForm: Categoria = new Categoria();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;
  validain_estado: boolean = false;
  titulo_vista:string = "Nueva";

  constructor(
    private snackbar: snackBar,
    private route: ActivatedRoute,
    private router: Router,
    private http: CategoriasService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.Id = this.route.snapshot.params['id'];
    if (this.Id != 'nuevo') {
      this.titulo_vista = 'Actualizar';
      this.getDataDetailById();
    }
  }

  getDataDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.CategoriaForm = resultData;
        }
      }
    },
      (error: any) => { 
        this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/categorias']);
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
    if (isValid && this.validain_estado) {
      this.http.saveData(this.CategoriaForm)
        .subscribe(async data => {
          this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/dashboard/categorias']);
          }, 500);
        },
          async error => {
            this.snackbar.error(error.message);
            setTimeout(() => {
              this.router.navigate(['/dashboard/categorias']);
            }, 500);
          });
    }
  }

  validarInStado() {
    this.validain_estado = true;
  }

  EditData(isValid: any) {
    this.validain_estado = true;
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateData(this.Id, this.CategoriaForm).subscribe(async data => {
        if (data != null) {
          this.snackbar.success("Registro Actualizado");
          setTimeout(() => {
            this.router.navigate(['/dashboard/categorias']);
          }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/categorias']);
          }, 500);
        });
    }
  }

}

