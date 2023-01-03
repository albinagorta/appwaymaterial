import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// SERVICIOS
import { CategoriasService } from 'src/app/modules/pages/services/categorias.service';
import { ProductosService } from 'src/app/modules/pages/services/productos.service';

// ENTIDAD
import { Producto } from 'src/app/modules/pages/models/productos.models';
import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  ProductoForm: Producto = new Producto();

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  validain_estado:boolean = false;
  Id: any;
  CategoriaList: any = [];
  titulo_vista:string = "Nuevo";

  constructor(
            private snackbar: snackBarHelper, 
            private route: ActivatedRoute, 
            private router: Router,
            private httpCat: CategoriasService,
            private http: ProductosService
            ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    if (this.Id != 'nuevo') {
      this.titulo_vista = 'Actualizar';
      this.getDataDetailById();
    }
    this.getAllCategoria();
  }

  getDataDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.ProductoForm=resultData;
        }
      }
    },
      (error: any) => { 
        this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/productos']);
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
      this.http.saveData( this.ProductoForm )
        .subscribe(async data => {
          this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/dashboard/productos']);
          }, 500);
        },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/productos']);
          }, 500);
        });
    }
  }

  EditData(isValid: any) {
    this.validain_estado = true;
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateData(this.Id,this.ProductoForm).subscribe(async data => {
        if (data!=null) {
          this.snackbar.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/dashboard/productos']);
              }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard/productos']);
          }, 500);
        });
    }
  }

  async getAllCategoria() {
    this.httpCat.getAllData().subscribe((data : any) => {
      if(data.ok){
      this.CategoriaList = data.body;
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            this.CategoriaList = [];
          }
        }
      });
  }


  validarInStado(){
    this.validain_estado = true;
  }

}

