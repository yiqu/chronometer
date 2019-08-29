import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

 //Root routes for app
const routes: Routes = [
  { 
    path: '', 
    component: AboutComponent, 
    data: {title: 'About'},
  }
];


/**
 * Routing module.
 * 
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ],
  
  declarations: []
})
export class AboutRoutingModule { }
