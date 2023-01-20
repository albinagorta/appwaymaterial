import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaComponent } from './components/categorias/categoria/categoria.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { RolesComponent } from './components/roles/roles.component';


const rutas: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, title: 'Dashboard' },

      /*Matenimiento de Categoria */
      {
        path: 'categorias',
        component: CategoriasComponent,
        canActivate: [UserGuard],
        title: 'Matenimiento de Categoria'
      },
      {
        path: 'categoria/:id',
        component: CategoriaComponent,
        canActivate: [UserGuard],
        title: 'Matenimiento de Categoria'
      },

      /*Matenimiento de Clientes */
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [UserGuard],
        title: 'Matenimiento de Cliente'
      },
      {
        path: 'cliente/:id',
        component: ClienteComponent,
        canActivate: [UserGuard],
        title: 'Matenimiento de Cliente'
      },

      /*Matenimiento de Productos */
      {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [UserGuard],
        title: 'Matenimiento de Producto'
      },
      {
        path: 'producto/:id',
        component: ProductoComponent,
        canActivate: [UserGuard],
        title: 'Matenimiento de Producto'
      },

      /*Matenimiento de Usuarios */
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        title: 'Matenimiento de Usuario'
      },
      {
        path: 'usuario/:id',
        component: UsuarioComponent,
        canActivate: [AdminGuard],
        title: 'Matenimiento de Usuario'
      },
      /*Matenimiento de roles */
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AdminGuard],
        title: 'Matenimiento de Rol'
      },
    ],
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
export class PagesRouterModule { }
