import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBar } from 'src/app/global/snackbar';
import { Usuario } from 'src/app/modules/models/usuario.models';
import { UsuariosService } from 'src/app/modules/service/usuarios.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editUsuarioForm: Usuario = new Usuario();

  @ViewChild("usuarioForm")
  usuarioForm!: NgForm;

  isSubmitted: boolean = false;
  Id: any;

  constructor(
            private snackbar: snackBar, 
            private route: ActivatedRoute, 
            private router: Router,
            private http: UsuariosService
            ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.getClienteDetailById();
  }

  getClienteDetailById() {
    this.http.getDataDetailById(this.Id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editUsuarioForm= resultData;
        }
      }
    },
      (error: any) => { });
  }

  EditData(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.http.UpdateData(this.Id,this.editUsuarioForm).subscribe(async data => {
        if (data!=null) {
          this.snackbar.success("Registro Actualizado");
              setTimeout(() => {
                this.router.navigate(['/usuarios']);
              }, 500);
        }
      },
        async error => {
          this.snackbar.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/usuarios']);
          }, 500);
        });
    }
  }

}

