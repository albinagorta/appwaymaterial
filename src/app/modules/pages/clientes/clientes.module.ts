import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULOS
import { MaterialModule } from 'src/app/material/material.module';
import { ClientesRouterModule } from './clientes-router.module';
import { CoreModule } from 'src/app/core/core.module';


// COMPONENTES
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListarComponent } from './listar/listar.component';
import { ClientesComponent } from './clientes.component';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListarComponent,
    ClientesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClientesRouterModule,
    RouterModule,
    CoreModule,
    MaterialModule
  ]
})

export class ClientesModule { }
