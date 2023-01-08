import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";

// HELPERS
import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';

// COMPONENTES
import { DialogoConfirmacionComponent } from 'src/app/modules/pages/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { RolComponent } from './rol/rol.component';

// SERVICIOS
import { RolesService } from 'src/app/modules/pages/services/roles.service';
import { Roles } from 'src/app/modules/pages/models/roles.models';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit, AfterViewInit {
  tablaColumns: string[] = ['id', 'nombre', 'estado', 'opciones'];
  dataList: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  public length = 0;
  public pageSize = 2;
  public pageSizeOptions = [2, 5, 10, 25, 100];

  parameters : any  = {};
  inputfilter : string = "";

  constructor(
    private http: RolesService,
    public dialogo: MatDialog,
    private snackbar: snackBarHelper
  ) {}

  ngOnInit() {
    this.getparametersInit();
    this.getAllData();
    this.dataList = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataList.sort = this.sort;
  }

  getAllData(): any {
    console.log(this.parameters);
    this.http.getAllData(this.parameters).subscribe((data: any) => {
      if (data.ok) {
        this.length = data.headers.get('X-Total-Count');
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


  OpenDialog(id='nuevo') {
    this.dialogo
      .open(RolComponent, {
        data: {id:id}
      })
      .afterClosed()
      .subscribe((response: any) => {
        if(response){
          this.getparametersInit();
          this.getAllData();
          this.paginator?.firstPage();
        }
      });
  }

  deleteDataConfirmation(data: Roles) {
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

  deletedata(data: Roles) {
    this.http.deleteDataById(data.id).subscribe((data: any) => {
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
    this.parameters['q'] = filterValue;
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
