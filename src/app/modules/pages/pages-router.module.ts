import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';

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
        title: 'Matenimiento de Categoria'
      },
      {
        path: 'categoria/:id',
        component: CategoriaComponent,
        title: 'Matenimiento de Categoria'
      },

      /*Matenimiento de Clientes */
      {
        path: 'clientes',
        component: ClientesComponent,
        title: 'Matenimiento de Cliente'
      },
      {
        path: 'cliente/:id',
        component: ClienteComponent,
        title: 'Matenimiento de Cliente'
      },

      /*Matenimiento de Productos */
      {
        path: 'productos',
        component: ProductosComponent,
        title: 'Matenimiento de Producto'
      },
      {
        path: 'producto/:id',
        component: ProductoComponent,
        title: 'Matenimiento de Producto'
      },

      /*Matenimiento de Usuarios */
      {
        path: 'usuarios',
        component: UsuariosComponent,
        title: 'Matenimiento de Usuario'
      },
      {
        path: 'usuario/:id',
        component: UsuarioComponent,
        title: 'Matenimiento de Usuario'
      },
      /*Matenimiento de roles */
      {
        path: 'roles',
        component: RolesComponent,
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
