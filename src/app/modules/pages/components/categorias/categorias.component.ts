import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  filterValues:any = {};
  filterSelectObj:any = [];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private router: Router,
    private httpCat: CategoriasService,
    public dialogo: MatDialog,
    private snackbar: snackBarHelper
  ) { 

    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'id',
        options: []
      }, {
        name: 'Nombre',
        columnProp: 'nombre',
        options: []
      }, {
        name: 'Estado',
        columnProp: 'in_estado',
        options: []
      }
    ]
  }

  ngOnInit() {
    this.getAllData();
    this.dataList = new MatTableDataSource();
    this.dataList.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataList.paginator = this.paginator;
    this.dataList.sort = this.sort;
  }

  getAllData(): any {
    this.httpCat.getAllData().subscribe((data: any) => {
      if (data.ok) {
        this.dataList.data = data.body;

        this.filterSelectObj.filter((o:any) => {
            o.options = this.getFilterObject(data.body, o.columnProp);
        });

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
      this.getAllData();

    },
      (error: any) => {
        this.snackbar.error(error.message);
      });
  }


  
  aplicarFiltro(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataList.filter = filterValue.trim().toLowerCase();
    this.filterValues['nombre'] = (event.target as HTMLInputElement).value.trim().toLowerCase()
    this.dataList.filter = JSON.stringify(this.filterValues)

    if (this.dataList.paginator) {
      this.dataList.paginator.firstPage();
    }
  }


  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj:any, key:any) {
    const uniqChk:any[] = [];
    fullObj.filter((obj:any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

    // Called on Filter change
    filterChange(filter:any, event:any) {
      //let filterValues = {}
      this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
      this.dataList.filter = JSON.stringify(this.filterValues)
    }
  
    // Custom filter method fot Angular Material Datatable
    createFilter() {
      let filterFunction = function (data: any, filter: string): boolean {
        let searchTerms = JSON.parse(filter);
        let isFilterSet = false;
        for (const col in searchTerms) {
          if (searchTerms[col].toString() !== '') {
            isFilterSet = true;
          } else {
            delete searchTerms[col];
          }
        }
  
        console.log(searchTerms);
  
        let nameSearch = () => {
          let found = false;
          if (isFilterSet) {
            for (const col in searchTerms) {
              searchTerms[col].trim().toLowerCase().split(' ').forEach((word : any) => {
                if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                  found = true
                }
              });
            }
            return found
          } else {
            return true;
          }
        }
        return nameSearch()
      }
      return filterFunction
    }
  
  
    // Reset table filters
    resetFilters() {
      this.filterValues = {}
      this.filterSelectObj.forEach((value:any, key:any) => {
        value.modelValue = undefined;
      })
      this.dataList.filter = "";
    }
}
