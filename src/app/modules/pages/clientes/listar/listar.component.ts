import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';

//GLOBALES
import { snackBar } from 'src/app/global/snackbar';

// COMPONENTES
import { DialogoConfirmacionComponent } from 'src/app/modules/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { Cliente } from 'src/app/modules/models/cliente.models';

// SERVICIOS
import { ClienteService } from 'src/app/modules/service/cliente.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit,AfterViewInit {
  tablaColumns: string[] = ['id', 'nombres', 'apellidos','email', 'direccion','celular','opciones'];
  dataList:any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(private router: Router, 
    public dialogo: MatDialog,
    private snackbar: snackBar,
    private http : ClienteService
    ) { }

    ngOnInit() {
      this.getAllData();
      this.dataList = new MatTableDataSource();
    }
  
    ngAfterViewInit() {
      this.dataList.paginator = this.paginator;
      this.dataList.sort = this.sort;
    }

  async getAllData() {
    this.http.getClientes().subscribe((data : any) => {
      if(data.ok){
      this.dataList.data = data.body;
      }
      
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            this.dataList.data = [];
          }
        }
      });
  }

  nuevo() {
    this.router.navigate(['/clientes/agregar']);
  }

  deleteDataConfirmation(data: Cliente) {
    this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `¿Estás seguro de que quieres eliminar?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.deleteData(data);
      }
    });
  }

  deleteData(data: Cliente) {
    this.http.deleteClienteById(data.id).subscribe((data : any) => {
          this.snackbar.success("Registro eliminado");
          this.getAllData();
    },
    (error : any) => {
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