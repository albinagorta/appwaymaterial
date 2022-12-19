import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categorias',
    loadChildren: () => import('src/app/modules/pages/categorias/categorias.module').then(m => m.CategoriasModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('src/app/modules/pages/productos/productos.module').then(m => m.ProductosModule),
  },
  {
    path: 'clientes',
    loadChildren: () => import('src/app/modules/pages/clientes/clientes.module').then(m => m.ClientesModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/modules/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('src/app/modules/pages/usuarios/usuarios.module').then(m => m.UsuariosModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ], 
  exports: [RouterModule]
})

export class PagesRouterModule { }
