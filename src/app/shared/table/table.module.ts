import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MaterialModule } from '../material-barrel.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
