import { NgModule } from '@angular/core';
import { TimeMomentFormat, TimeDisplayFormat } from './time-format.pipe';
import { timerButtonTextPipe } from './timer-button.pipe';

@NgModule({
  imports: [],
  exports: [
    TimeMomentFormat,
    timerButtonTextPipe,
    TimeDisplayFormat
  ],

  declarations: [
    TimeMomentFormat,
    timerButtonTextPipe,
    TimeDisplayFormat
  ],

  providers: [],
})
export class PipesBarrelModule { }
