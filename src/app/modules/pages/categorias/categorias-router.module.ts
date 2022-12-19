import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTES
import { ListarComponent } from './listar/listar.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { CategoriasComponent } from './categorias.component';
import { AuthGuard } from 'src/app/modules/guards/auth.guard';

const rutas: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: ListarComponent, title: 'Categoria' },
      {
        path: 'agregar',
        component: AddComponent,
        data: { titulo: 'Agregar nueva Categoria' },
        title: 'Categoria | Nuevo'
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        title: 'Categoria | Actualizar'
      }
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoriasRouterModule { }
