import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// SERVICIOS
import { CategoriasService } from 'src/app/modules/service/categorias.service';
import { ProductosService } from 'src/app/modules/service/productos.service';

// ENTIDAD
import { Producto } from 'src/app/modules/models/productos.models';
import { snackBar } from 'src/app/global/snackbar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editDataForm: Producto = new Producto();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;
  CategoriaList: any = [];

  constructor(
            private snackbar: snackBar, 
            private route: ActivatedRoute, 
            private router: Router,
            private httpCat: CategoriasService,
            private http: ProductosService
            ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.getDataDetailById();
    this.getAllCategoria();
  }

  getDataDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editDataForm=resultData;
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
                this.router.navigate(['/productos']);
              }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 500);
        });
    }
  }

  async getAllCategoria() {
    this.httpCat.getAllData().subscribe((data : any) => {
      console.log(data)
      if(data.ok){
      this.CategoriaList = data.body;
      }
    },
    (error : any)=> {
      console.log(error)
        if (error) {
          if (error.status == 404) {
            this.CategoriaList = [];
          }
        }
      });
  }


}

