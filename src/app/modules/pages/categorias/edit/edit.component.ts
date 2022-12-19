import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBar } from 'src/app/global/snackbar';

import { Categoria } from 'src/app/modules/models/categoria.models';
import { CategoriasService } from 'src/app/modules/service/categorias.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editDataForm: Categoria = new Categoria();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;

  constructor(
            private snackbar: snackBar,
            private route: ActivatedRoute, 
            private router: Router,
            private http: CategoriasService
            ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.Id = this.route.snapshot.params['id'];
    this.getDataDetailById();
  }

  getDataDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editDataForm = resultData;
        }
      }
    },
      (error: any) => { });
  }

  EditData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateData(this.Id,this.editDataForm).subscribe(async data => {
        if (data!=null) {
          this.snackbar.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/categorias']);
              }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/categorias']);
          }, 500);
        });
    }
  }

}

