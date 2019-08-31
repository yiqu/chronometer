import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { NotFoundComponent } from '../404/404.component';
import { MaterialModule } from '../shared/material-barrel.module';
import { PipesBarrelModule } from '../shared/pipes/pipes-barrel.module';

@NgModule({
  declarations: [
    CoreComponent,
    NotFoundComponent
  ],

  imports: [
    CommonModule , 
    FormsModule, 
    MaterialModule,
    PipesBarrelModule
  ],

  exports: [
  ],
  
  providers: [
  ]

})
export class CoreModule { }
