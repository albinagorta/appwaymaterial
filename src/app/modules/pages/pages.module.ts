import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULOS
import { PagesRouterModule } from './pages-router.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreModule } from 'src/app/core/core.module';

//COMPONENTES
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
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



@NgModule({
  declarations: [
    DialogoConfirmacionComponent,
    PagesComponent,
    DashboardComponent,
    CategoriasComponent,
    CategoriaComponent,
    ClientesComponent,
    ClienteComponent,
    ProductosComponent,
    ProductoComponent,
    UsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    PagesRouterModule
  ],
  exports: [],

})

export class PagesModule { }
