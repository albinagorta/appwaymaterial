import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';

// GLOBALES
import { snackBar } from 'src/app/global/snackbar';

// COMPONENTES
import { DialogoConfirmacionComponent } from 'src/app/modules/components/dialogo-confirmacion/dialogo-confirmacion.component';

// SERVICIOS
import { CategoriasService } from 'src/app/modules/service/categorias.service';
import { Categoria } from 'src/app/modules/models/categoria.models';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})

export class ListarComponent implements OnInit,AfterViewInit {
  tablaColumns: string[] = ['id', 'nombre', 'estado','opciones'];
  dataList:any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private router: Router, 
    private httpCat: CategoriasService,
    public dialogo: MatDialog,
    private snackbar: snackBar
    ){ }



  ngOnInit() {
    this.getAllData();
    this.dataList = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataList.paginator = this.paginator;
    this.dataList.sort = this.sort;
  }

  getAllData():any {
    this.httpCat.getAllData().subscribe((data: any) => {
      if (data.ok) {
        this.dataList.data = data.body;
      }
    },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            this.dataList.data = [];
          }
        }
      });
  }


  nuevo() {
    this.router.navigate(['/categorias/agregar']);
  }

  deleteDataConfirmation(data: Categoria) {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Estás seguro de que quieres eliminar?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deletedata(data);
        }
      });
  }

  deletedata(data: Categoria) {
    this.httpCat.deleteDataById(data.id).subscribe((data: any) => {
       this.snackbar.success("Registro eliminado");
      this.getAllData();

    },
      (error: any) => { 
        this.snackbar.error(error.message);
      });
  }

 

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataList.filter = filterValue.trim().toLowerCase();
    if (this.dataList.paginator) {
      this.dataList.paginator.firstPage();
    }
  }
}
