import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { TimeData, TimeDataInformation, TimeTableHeader } from '../model/data.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  @Input('tableData')
  dataSource: any[];

  @Input('tableHeaders')
  headers: TimeTableHeader[];

  displayedColumns: string[];
  tableDatasource = new MatTableDataSource<TimeData>();

  constructor() {
    this.displayedColumns = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("table changes: ", this.dataSource)
    console.log("headers: ", this.headers)
    this.tableDatasource = new MatTableDataSource<TimeData>(this.dataSource);
    this.resetPaginator();
  }

  ngOnInit() {
    this.resetPaginator();
  }

  resetPaginator() {
    this.tableDatasource.paginator = this.paginator;
    this.paginator.firstPage();
  }

  ngOnDestroy() {

  }
}