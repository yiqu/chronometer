import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MaterialModule } from '../material-barrel.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPaginator } from './table-config';
import { MatPaginatorIntl } from '@angular/material';
import { PipesBarrelModule } from '../pipes/pipes-barrel.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PipesBarrelModule
  ],

  exports: [
    TableComponent
  ],

  declarations: [
    TableComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class SharedTableModule { }
