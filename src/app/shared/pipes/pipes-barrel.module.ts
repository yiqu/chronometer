import { NgModule } from '@angular/core';
import { TimeMomentFormat } from './time-format.pipe';
import { timerButtonTextPipe } from './timer-button.pipe';

@NgModule({
  imports: [],
  exports: [
    TimeMomentFormat,
    timerButtonTextPipe
  ],

  declarations: [
    TimeMomentFormat,
    timerButtonTextPipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
