import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [
    AboutComponent
  ],

  imports: [
    CommonModule , 
    FormsModule,
    AboutRoutingModule
  ],

  exports: [
  ],

  providers: [
  ]

})
export class AboutModule { }
