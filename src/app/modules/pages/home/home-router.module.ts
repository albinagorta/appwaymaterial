import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTES
import { AuthGuard } from 'src/app/modules/guards/auth.guard';
import { HomeComponent } from './home.component';

const rutas: Routes = [
  {
    path: 'dashboard',
    title:'dashboard',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    // children: [
    //   {
    //     path: '',
    //     component: HomeComponent
    //   }
    // ]
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
export class HomeRouterModule { }