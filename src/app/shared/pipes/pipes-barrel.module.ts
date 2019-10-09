import { NgModule } from '@angular/core';
import { TimeMomentFormat, TimeDisplayFormat } from './time-format.pipe';
import { timerButtonTextPipe } from './timer-button.pipe';
import { TableColumnHeaderPipe } from './table.pipe';

@NgModule({
  imports: [],
  exports: [
    TimeMomentFormat,
    timerButtonTextPipe,
    TimeDisplayFormat,
    TableColumnHeaderPipe
  ],

  declarations: [
    TimeMomentFormat,
    timerButtonTextPipe,
    TimeDisplayFormat,
    TableColumnHeaderPipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
