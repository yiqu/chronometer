import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './top-nav.component';
import { TimeModule } from '../shared/time/time.module';

@NgModule({
  declarations: [
    NavBarComponent
  ],

  imports: [
    CommonModule , 
    FormsModule, 
    RouterModule,
    TimeModule
  ],

  exports: [
    NavBarComponent
  ],
  
  providers: [
  ]

})
export class TopNavModule { }
