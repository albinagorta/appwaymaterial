import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';

//GLOBALES
import { snackBarHelper } from 'src/app/modules/pages/helpers/snackbar.helper';

// COMPONENTES
import { DialogoConfirmacionComponent } from 'src/app/modules/pages/components/dialogo-confirmacion/dialogo-confirmacion.component';

// SERVICIOS
import { UsuariosService } from 'src/app/modules/pages/services/usuarios.service';
import { Usuario } from '../../models/usuario.models';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  tablaColumns: string[] = ['id', 'nombres', 'apellidos','email','estado','opciones'];
  dataList:any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private router: Router, 
    public dialogo: MatDialog,
    private snackbar: snackBarHelper,
    private http : UsuariosService
    ){ }

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
      console.log(data);
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
    this.router.navigate(['/dashboard/usuario/nuevo']);
  }

  deleteDataConfirmation(data: Usuario) {
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

  deleteData(data: Usuario) {
    this.http.deleteDataById(data.id).subscribe((data : any) => {
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