import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// SERVICIOS
import { CategoriasService } from '../../../service/categorias.service';
import { ProductosService } from '../../../service/productos.service';

// INTERFAZ
import { Producto } from '../../../models/productos.models';
import { snackBar } from 'src/app/global/snackbar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addDataForm: Producto =  {
    nombre: "",
    stock:undefined,
    precio:undefined,
    in_estado : 0,
    id_categoria:undefined,
  };

  @ViewChild("dataForm")
  dataForm!: NgForm;

  isSubmitted: boolean = false;
  validain_estado:boolean = false;
  
  CategoriaList: any = [];
  constructor(private router: Router, 
              private http: ProductosService,
              private httpCat: CategoriasService, 
              private snackbar: snackBar
              ) { }

  ngOnInit(): void {
    this.getAllCategoria();
  }

  AgregarData(isValid: any) {
    this.isSubmitted = true;
    if (isValid && this.validain_estado) {  
      this.http.saveData( this.addDataForm )
        .subscribe(async data => {
          this.snackbar.success('Registro creado');
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 500);
        },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 500);
        });
    }
  }


  validarInStado(){
    this.validain_estado = true;
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

