import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TimeData, TimeDataInformation, ITimeTableHeader } from '../model/data.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  @Input('tableData')
  dataSource: any[];

  @Input('tableHeaders')
  tableHeaders: ITimeTableHeader[];

  displayedColumns: string[];
  tableDatasource = new MatTableDataSource<TimeData>();

  constructor() {
    this.displayedColumns = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("table changes: ", this.dataSource)
    console.log("headers: ", this.tableHeaders)

    this.createColumnDisplay();
    this.tableDatasource = new MatTableDataSource<TimeData>(this.dataSource);
    this.resetPaginator();
  }

  ngOnInit() {
    this.resetPaginator();
  }

  createColumnDisplay() {
    this.displayedColumns = [];
    this.tableHeaders.forEach((header: ITimeTableHeader) => {
      this.displayedColumns.push(header.id);
    });
  }

  resetPaginator() {
    this.tableDatasource.paginator = this.paginator;
    this.paginator.firstPage();
  }

  onRowClick(row) {
    console.log(row)
  }

  ngOnDestroy() {

  }
}