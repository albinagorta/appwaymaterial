import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

//MODELOS
import { ProductosRouterModule } from './productos-router.module';
import { MaterialModule } from 'src/app/material/material.module';

// COMPONENTES
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListarComponent } from './listar/listar.component';
import { ProductosComponent } from './productos.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';




@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListarComponent,
    ProductosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProductosRouterModule,
    RouterModule,
    CoreModule,
    MaterialModule
  ]
})
export class ProductosModule { }
