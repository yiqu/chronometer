import { NgModule } from '@angular/core';
import { DropdownDirective } from './bs-open.dir';
import { RainbowColorDirective } from './rainbow.dir';

@NgModule({
  imports: [],

  exports: [
    DropdownDirective,
    RainbowColorDirective
  ],

  declarations: [
    DropdownDirective,
    RainbowColorDirective
  ],

  providers: [],
})
export class DirectivesBarrelModule { }
