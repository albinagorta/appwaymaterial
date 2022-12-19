import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/modules/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { ListarComponent } from './listar/listar.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const rutas: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ AuthGuard ],
    title: 'Usuarios',
    children: [
      {
        path: '',
        component: ListarComponent
      },
      {
        path: 'agregar',
        component: AddComponent
      }, 
      {
        path: 'edit/:id',
        component: EditComponent
      }
    ]
  }
  
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class UsuariosRouterModule { }
