import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTES
import { ListarComponent } from './listar/listar.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ProductosComponent } from './productos.component';
import { AuthGuard } from 'src/app/modules/guards/auth.guard';

const rutas: Routes = [
  {
    path: 'productos',
    title:'Productos',
    component: ProductosComponent,
    canActivate: [ AuthGuard ],
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
export class ProductosRouterModule { }
