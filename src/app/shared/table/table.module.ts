import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MaterialModule } from '../material-barrel.module';

@NgModule({
  imports: [
    MaterialModule
  ],

  exports: [
    TableComponent
  ],

  declarations: [
    TableComponent
  ],
  providers: [],
})
export class SharedTableModule { }
