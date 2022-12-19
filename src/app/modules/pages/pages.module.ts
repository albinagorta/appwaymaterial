import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';

//COMPONENTES
import { DialogoConfirmacionComponent } from '../components/dialogo-confirmacion/dialogo-confirmacion.component';
import { ProductosModule } from './productos/productos.module';
import { HomeModule } from './home/home.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PagesRouterModule } from './pages-router.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [DialogoConfirmacionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    HomeModule,
    UsuariosModule,
    PagesRouterModule
  ],
  exports: [
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    HomeModule,
    PagesRouterModule
  ], 
  
})

export class PagesModule { }
