import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './top-nav.component';
import { TimeModule } from '../shared/time/time.module';
import { DirectivesBarrelModule } from '../shared/directives/dir-barrel.module';


@NgModule({
  declarations: [
    NavBarComponent
  ],

  imports: [
    CommonModule , 
    FormsModule, 
    RouterModule,
    TimeModule,
    DirectivesBarrelModule
  ],

  exports: [
    NavBarComponent
  ],
  
  providers: [
  ]

})
export class TopNavModule { }
