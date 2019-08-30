import { NgModule } from '@angular/core';
import { PipesBarrelModule } from '../pipes/pipes-barrel.module';
import { TimeComponent } from './time.component';

@NgModule({
  imports: [
    PipesBarrelModule
  ],

  exports: [
    TimeComponent
  ],

  declarations: [
    TimeComponent
  ],

  providers: [],
})
export class TimeModule { }
