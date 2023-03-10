import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';

// GLOBALES
import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';

// COMPONENTES
import { DialogoConfirmacionComponent } from 'src/app/modules/pages/components/dialogo-confirmacion/dialogo-confirmacion.component';

// SERVICIOS
import { CategoriasService } from 'src/app/modules/pages/services/categorias.service';
import { ProductosService } from 'src/app/modules/pages/services/productos.service';
import { Producto } from 'src/app/modules/pages/models/productos.models';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit, AfterViewInit {
  tablaColumns: string[] = ['id', 'nombre', 'categoria','stock','precio','estado','opciones'];
  dataList:any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private router: Router, 
    public dialogo: MatDialog,
    private snackbar: snackBarHelper,
    private http : ProductosService,
    private httpCat : CategoriasService) { }

    ngOnInit() {
      this.getAllData();
      this.dataList = new MatTableDataSource();
    }
  
    ngAfterViewInit() {
      this.dataList.paginator = this.paginator;
      this.dataList.sort = this.sort;
    }

  async getAllData() {
    this.http.getAllData().subscribe((data : any) => {
      console.log(data)
      if(data.ok){
        for (let i = 0; i < data.body.length; i++) {
          this.httpCat.getDataDetailById(data.body[i].id_categoria).subscribe(data2 => { 
            data.body[i].categoria = data2.body
          });
        }
        
         this.dataList.data = data.body;
      }
    },
    (error : any)=> {
      console.log(error)
        if (error) {
          if (error.status == 404) {
             this.dataList.data = [];
          }
        }
      });
  }

  nuevo() {
    this.router.navigate(['/dashboard/producto/nuevo']);
  }

  deleteDataConfirmation(data: Producto) {
    this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `??Est??s seguro de que quieres eliminar?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.deletedata(data);
      }
    });
  }

  deletedata(data: any) {
    this.http.deleteDataById(data.id).subscribe((data : any) => {
          this.snackbar.success("Registro eliminado");
          this.getAllData();
    },
    (error : any) => {});
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataList.filter = filterValue.trim().toLowerCase();
    if (this.dataList.paginator) {
      this.dataList.paginator.firstPage();
    }
  }

}