import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { NotFoundComponent } from '../404/404.component';

@NgModule({
  declarations: [
    CoreComponent,
    NotFoundComponent
  ],

  imports: [
    CommonModule , 
    FormsModule, 
  ],

  exports: [
  ],
  
  providers: [
  ]

})
export class CoreModule { }
