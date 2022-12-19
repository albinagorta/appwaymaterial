import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { HomeComponent } from './home.component';
import { HomeRouterModule } from './home-router.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRouterModule,
    RouterModule,
    CoreModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
