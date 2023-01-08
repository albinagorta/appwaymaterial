import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';

// HELPERS
import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';

// COMPONENTES
import { DialogoConfirmacionComponent } from 'src/app/modules/pages/components/dialogo-confirmacion/dialogo-confirmacion.component';

// SERVICIOS
import { CategoriasService } from 'src/app/modules/pages/services/categorias.service';
import { Categoria } from 'src/app/modules/pages/models/categoria.models';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit, AfterViewInit {
  tablaColumns: string[] = ['id', 'nombre', 'estado', 'opciones'];
  dataList: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  public length = 0;
  public pageSize = 2;
  public pageSizeOptions = [5, 10, 25, 100];

  parameters : any  = {};
  inputfilter : string = "";

  constructor(
    private router: Router,
    private httpCat: CategoriasService,
    public dialogo: MatDialog,
    private snackbar: snackBarHelper
  ) {}

  ngOnInit() {
    this.getparametersInit();
    this.getAllData();
    this.dataList = new MatTableDataSource();
  }

  ngAfterViewInit() {
    // this.dataList.paginator = this.paginator;
    this.dataList.sort = this.sort;
  }

  getAllData(): any {
    console.log(this.parameters);
    this.httpCat.getAllData(this.parameters).subscribe((data: any) => {
      this.length = data.headers.get('X-Total-Count');
      console.log(this.length);
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
    this.router.navigate(['dashboard/categoria/nuevo']);
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
      this.getparametersInit();
      this.getAllData();
      this.paginator?.firstPage();
    },
      (error: any) => {
        this.snackbar.error(error.message);
      });
  }


  
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inputfilter = filterValue;
    // this.parameters['q'] = filterValue;
    this.getAllData();
    this.paginator?.firstPage();
  }


  getNextPage(event: PageEvent) {
   this.parameters["page"] = event.pageIndex+1;
    this.parameters['limit'] = event.pageSize;
    this.getAllData();
  }

  getparametersInit(){
      this.parameters["page"] = 1;
      this.parameters['limit'] = 2;
      this.parameters["q"] = this.inputfilter;
  }

}
